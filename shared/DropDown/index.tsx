import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type AlignmentType =
  | "bottom-left"
  | "bottom-right"
  | "bottom"
  | "top-left"
  | "top-right"
  | "top"
  | "middle-left"
  | "middle-right";

export interface DropdownProps {
  dropDownInfo?: React.ReactNode;
  alignment?: AlignmentType;
  dropdownContent: {
    id: string;
    value: React.ReactNode;
    onClick?: () => void;
    redirect?: string;
  }[];
}

const DropDown: React.FC<DropdownProps> = ({
  dropDownInfo,
  dropdownContent,
  alignment = "bottom",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get position classes based on alignment
  const getPositionClasses = (align: AlignmentType) => {
    const positions = {
      "bottom-left": "top-full right-0", // Changed from left-0 to right-0
      "bottom-right": "top-full left-0", // Changed from right-0 to left-0
      bottom: "top-full left-1/2 -translate-x-1/2",
      "top-left": "bottom-full right-0", // Changed from left-0 to right-0
      "top-right": "bottom-full left-0", // Changed from right-0 to left-0
      top: "bottom-full left-1/2 -translate-x-1/2",
      "middle-left": "top-1/2 right-full -translate-y-1/2 mr-2",
      "middle-right": "top-1/2 left-full -translate-y-1/2 ml-2",
    };
    return positions[align];
  };

  const getDropdownVariants = (align: AlignmentType) => {
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    };

    if (align.startsWith("top")) {
      return {
        hidden: { ...baseVariants.hidden, y: 10 },
        visible: { ...baseVariants.visible, y: 0 },
        exit: { ...baseVariants.exit, y: 10 },
      };
    }
    if (align.startsWith("bottom")) {
      return {
        hidden: { ...baseVariants.hidden, y: -10 },
        visible: { ...baseVariants.visible, y: 0 },
        exit: { ...baseVariants.exit, y: -10 },
      };
    }
    if (align.startsWith("middle")) {
      return {
        hidden: {
          ...baseVariants.hidden,
          x: align.includes("left") ? 10 : -10,
        },
        visible: { ...baseVariants.visible, x: 0 },
        exit: { ...baseVariants.exit, x: align.includes("left") ? 10 : -10 },
      };
    }

    return baseVariants;
  };

  const handleItemClick = (item: (typeof dropdownContent)[0]) => {
    if (item.onClick) {
      item.onClick();
    }
    setIsOpen(false);
  };

  const dropdownVariants = getDropdownVariants(alignment);
  const positionClasses = getPositionClasses(alignment);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {" "}
      {/* Changed from inline-flex to inline-block */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-center items-center gap-2 py-3 px-6 text-sm bg-indigo-600 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-300 hover:bg-indigo-700"
      >
        {dropDownInfo || "Dropdown"}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            className="w-2.5 h-2.5 text-white"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            transition={{ duration: 0.2 }}
            style={{ width: buttonRef.current?.offsetWidth }} // Match button width
            className={`absolute ${positionClasses} min-w-[12rem] py-2 bg-white rounded-xl shadow-lg z-50 ${
              alignment.startsWith("top")
                ? "mb-2"
                : alignment.startsWith("bottom")
                ? "mt-2"
                : ""
            }`}
          >
            <ul>
              {dropdownContent.map((item) => (
                <li key={item.id}>
                  {item.redirect ? (
                    <Link
                      href={item.redirect}
                      className="block px-6 py-2 hover:bg-gray-100 text-gray-900 font-medium transition-colors duration-200"
                    >
                      {item.value}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleItemClick(item)}
                      className="w-full text-left px-6 py-2 hover:bg-gray-100 text-gray-900 font-medium transition-colors duration-200"
                    >
                      {item.value}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropDown;
