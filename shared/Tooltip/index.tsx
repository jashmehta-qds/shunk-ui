import React, { useState } from "react";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  tooltipClassName?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = "top",
  tooltipClassName,
}) => {
  const [hovered, setHovered] = useState(false);

  let tooltipPositionClasses = "";
  let arrowPositionClasses = "";

  switch (position) {
    case "top":
      tooltipPositionClasses =
        "bottom-full left-1/2 transform -translate-x-1/2 mb-3";
      arrowPositionClasses =
        "bottom-[-5px] left-1/2 transform -translate-x-1/2 rotate-45";
      break;
    case "bottom":
      tooltipPositionClasses =
        "top-full left-1/2 transform -translate-x-1/2 mt-3";
      arrowPositionClasses =
        "top-[-5px] left-1/2 transform -translate-x-1/2 rotate-45";
      break;
    case "left":
      tooltipPositionClasses =
        "right-full top-1/2 transform -translate-y-1/2 mr-3";
      arrowPositionClasses =
        "right-[-5px] top-1/2 transform -translate-y-1/2 rotate-45";
      break;
    case "right":
      tooltipPositionClasses =
        "left-full top-1/2 transform -translate-y-1/2 ml-3";
      arrowPositionClasses =
        "left-[-5px] top-1/2 transform -translate-y-1/2 rotate-45";
      break;
  }

  return (
    <div
      className="cursor-pointer relative inline-block w-fit"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      {hovered && (
        <div
          className={`absolute z-40 ${tooltipPositionClasses} ${tooltipClassName}	 bg-white border border-gray-300 text-gray-800 text-sm rounded-lg px-4 py-2
          transition-opacity transition-transform duration-300 ease-out transform scale-95 opacity-0 shadow-md
          ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          {content}

          <div
            className={`absolute w-2.5 h-2.5 bg-white border border-gray-300 ${arrowPositionClasses}`}
            style={{ boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.1)" }}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
