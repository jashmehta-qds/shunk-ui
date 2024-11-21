import RangeInput from "@/shared/RangeInput";
import clsx from "clsx";
import { FastAverageColor } from "fast-average-color";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface Item {
  id: number | string;
  name: React.ReactNode | string;
  percentage: number;
  color?: string;
}

interface PercentageDistributorProps {
  items: Item[];
  handleChange: (id: number | string, value: number) => void;
  width?: number;
}

export const PercentageDistributor: React.FC<PercentageDistributorProps> = ({
  items,
  handleChange,
  width,
}) => {
  const [totalPercentage, setTotalPercentage] = useState<number>(0);
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    const total = items.reduce((sum, item) => sum + item.percentage, 0);
    setTotalPercentage(total);
    setIsValid(total === 100);
  }, [items]);

  // const handleChange = (id: number | string, value: number) => {
  //   const updatedData = items.map((item) =>
  //     item.id === id ? { ...item, percentage: value } : item
  //   );
  //   setData(updatedData);
  // };

  const handleBlur = () => {
    if (totalPercentage > 100) {
      alert("Total percentage cannot exceed 100%");
    }
  };

  // const handleSubmit = () => {
  //   if (isValid) {
  //     onValidSubmit(items);
  //     console.log(items);
  //   } else {
  //     alert("Please ensure the total percentage equals 100%");
  //   }
  // };

  return (
    <div className="w-full lg:w-11/12 flex flex-col justify-center gap-y-3 gap-x-3  ">
      {items.map((item, id) => {
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (0.2 * id) / 2 }}
          >
            <div
              key={item.id}
              className={`w-full lg:min-w-80 p-2 lg:p-4 bg-[#ffffff] rounded-lg transform transition-all duration-300 shadow-md hover:scale-105
            ${
              totalPercentage > 100
                ? "hover:shadow-lg shadow-red-800 border-red-800 "
                : "hover:shadow-md "
            }`}
              style={{
                borderColor: item.color,
                borderWidth: "1px",
                // "&:hover" : {boxShadow: `0 8px 16px -6px ${item.color}, 0 8px 12px -6px ${item.color}`},
              }}
            >
              <div className="flex justify-between items-center">
                <span className="text-indigo-800 font-semibold">
                  {item.name}
                </span>
                <div>
                  <div className="w-full self-end content-end flex justify-end pb-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={item.percentage}
                      onChange={(e) =>
                        handleChange(item.id, parseInt(e.target.value, 10) || 0)
                      }
                      onBlur={handleBlur}
                      className={clsx(
                        "w-fit p-2 py-1 border rounded-md text-right block text-sm font-normal shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 pr-5",
                        totalPercentage > 100
                          ? "text-red-600 border-red-500 focus:ring-red-200"
                          : "text-emerald-600 focus:ring-emerald-200"
                      )}
                      style={{
                        borderColor:
                          totalPercentage > 100 ? "rgb(239 68 68)" : item.color,
                        borderWidth: "1px",
                      }}
                    />
                    <span
                      className={`absolute py-[0.125rem] mx-1 ${
                        totalPercentage > 100
                          ? "text-red-500"
                          : "text-emerald-600"
                      }`}
                    >
                      %
                    </span>
                  </div>

                  <RangeInput
                    value={item.percentage}
                    onChange={(e) => handleChange(item.id, e)}
                    color={item.color}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
