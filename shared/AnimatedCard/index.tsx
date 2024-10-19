"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const customTooltip = ({ point }) => {
  return (
    <div
      style={{
        background: "white",
        padding: "5px",
        border: "1px solid #ccc",
      }}
    >
      {point.data.yFormatted}
    </div>
  );
};
export interface AnimatedCardProps {
  children: React.ReactNode;
  uniqueId: string;
  modalContent: React.ReactNode;
  onclick?: () => void;
  className?: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  uniqueId,
  modalContent,
  onclick,
  className,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <motion.div
        onClick={() => setModalOpen(true)}
        layoutId={uniqueId}
        className={` ${className} cursor-pointer`}
      >
        {children}
      </motion.div>
      <AnimatePresence>
        {modalOpen && (
          <div
            className="absolute top-0 left-0 right-0 bottom-0 z-5 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          ></div>
        )}
        {modalOpen && (
          <motion.div
            className="absolute rounded-lg shadow-md translateX(50%) top-[50%] bg-white z-50"
            layoutId={uniqueId}
            onClick={() => onclick()}
          >
            {modalContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AnimatedCard;
