import { motion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";

import { random as _random } from "lodash";
import React, { useEffect, useState } from "react";

import { BubbleDragProps } from "./typings";
import { FastAverageColor } from "fast-average-color";

const colors = ["#dddfd4", "#fae596", "#3fb0ac", "#173e43"];

const makeRgbColor = () => colors[_random(0, 6)];
const generateDataset = () => {
  return [
    _random(-(window.innerWidth * 0.05), window.innerWidth * 0.9),
    _random(1, window.innerHeight * 0.8),
    makeRgbColor(),
  ];
};
export const BubbleDrag: React.FC<BubbleDragProps> = ({
  size = 1,
  data,
  isLoading = false,
  color,
  reference,
}) => {
  const [dataset, setDataset] = useState(generateDataset());
  const [showColor, setColor] = useState<string>("#ffff");
  useLayoutEffect(() => {
    const fac = new FastAverageColor();

    const getColor = async () => {
      const iconColor = await fac.getColorAsync(color);
      setColor(iconColor.rgba);
    };
    getColor();
  }, [color]);
  useEffect(() => {
    const interva = setInterval(
      () => {
        const newDataset = generateDataset();
        setDataset(newDataset);
      },
      isLoading ? 1000 : 2000
    );
    return () => {
      clearTimeout(interva);
    };
  }, [data, isLoading]);

  return (
    <motion.div
      layout="size"
      animate={{
        x: dataset[0],
        y: dataset[1],
        backgroundColor: showColor ?? dataset[2] + "",
      }}
      transition={{ type: "spring", stiffness: isLoading ? 20 : 80 }}
      style={{
        width: size + "rem",
        height: size + "rem",
        zIndex: isLoading ? 1000 : "-10",
      }}
      className={`pointer-events-none opacity-70 text-white flex items-center justify-center rounded-full shadow-lg pointer-events-auto overflow-hidden`}
      drag
      dragConstraints={reference}
    >
      {data}
    </motion.div>
  );
};
