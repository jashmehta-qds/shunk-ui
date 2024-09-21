"use client";
import { motion } from "framer-motion";
import React from "react";

interface ProfitLossProps {
  percentage: number;
}

const ProfitLoss: React.FC<ProfitLossProps> = ({ percentage }) => {
  const isProfit = percentage > 0;

  return (
    <div className="space-x-2">
      <motion.div
        animate={{ rotate: isProfit ? 0 : 180 }}
        transition={{ duration: 0.5 }}
        className={`w-0 h-0 border-l-8 border-r-8 ${
          isProfit
            ? "border-b-16 border-green-500"
            : "border-t-16 border-red-500"
        }`}
        style={{
          borderTopColor: isProfit ? "transparent" : undefined,
          borderBottomColor: isProfit ? undefined : "transparent",
        }}
      />
      <span
        className={`text-md font-bold  ${
          isProfit ? "text-green-600" : "text-red-600"
        }`}
      >
        {isProfit ? "+" : ""}
        {percentage.toFixed(2)}%
      </span>
    </div>
  );
};

export default ProfitLoss;
