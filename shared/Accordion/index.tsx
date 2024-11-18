"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface AccordionProps {
  heading: string;
  content: string | React.ReactNode;
  customClass?: string;
  sizes?: {
    maxHeight?: string;
    minHeight?: string;
    headingSize?: string;
    contentSize?: string;
  };
}

export const Accordion: React.FC<AccordionProps> = ({
  heading,
  content,
  customClass = "",
  sizes = {
    maxHeight: "500px",
    minHeight: "50px",
    headingSize: "text-lg",
    contentSize: "text-base",
  },
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className={`
        text-left
        w-full 
        rounded-xl 

        bg-white/10 
        shadow-lg 
        border 
        border-white/20
        ${customClass}
      `}
      style={{ minHeight: sizes.minHeight }}
    >
      <motion.button
        className={`
          w-full 
          flex 
          justify-between 
          items-center 
          p-6 
          ${sizes.headingSize} 
          font-medium 
          text-left 
          text-gray-800
          hover:bg-white/5 
          transition-all
          duration-300
          ease-in-out
        `}
        onClick={() => setIsOpen(!isOpen)}
        initial={false}
      >
        <span>{heading}</span>
        <div
          className={`
            group
            flex 
            items-center 
            justify-center 
            w-8 
            h-8 
            rounded-full 
            transition-all
            duration-300
            ease-in-out
            hover:scale-105
            ${isOpen ? "bg-mainBlue" : "bg-white/20 hover:bg-white/30"} 
            text-white 
            shadow-md 
            shadow-purple-300/20
            ml-4
          `}
        >
          <motion.span
            initial={false}
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className={`
              block
              transition-all
              duration-0
              ease-in-out
              ${
                isOpen
                  ? "text-white"
                  : "text-mainBlue group-hover:text-mainBlue/80"
              }
              font-medium
              text-lg
              leading-none
            `}
          >
            +
          </motion.span>
        </div>
      </motion.button>

      <motion.div
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          height: {
            type: "spring",
            stiffness: 300,
            damping: 25,
            bounce: 0.3,
          },
          opacity: { duration: 0.2 },
        }}
        style={{ maxHeight: sizes.maxHeight }}
        className="overflow-hidden"
      >
        <div
          className={`
            px-6 
            pb-6 
            ${sizes.contentSize} 
            text-gray-600
            leading-relaxed
          `}
        >
          {content}
        </div>
      </motion.div>
    </div>
  );
};
