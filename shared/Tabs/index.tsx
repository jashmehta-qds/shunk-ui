import React from "react";
import { TabsProps } from "./typings";
import Link from "next/link";

export const Tabs: React.FC<TabsProps> = ({ tabList, onChange, selected }) => {
  return (
    <div className="tabs">
      <div className="block">
        <ul className="flex border-b border-gray-200 space-x-3 transition-all duration-300">
          {tabList.map(({ id, value, redirection }) => {
            const isSelected = selected === id;
            return (
              <li
                className="w-1/2 md:w-fit  text-center md:text-left"
                key={`tabs-${id}`}
              >
                <Link
                  data-tab={`tabs-${id}`}
                  role="tab"
                  href={redirection}
                  className={`
                    inline-block py-3 px-4 md:py-4 md:px-6 
                    font-medium 
                    transition-all duration-300 
                    w-full
                    ${
                      isSelected
                        ? "font-semibold 	 text-blue-600 border-b-2 border-blue-600 bg-blue-50 md:bg-transparent md:border-b-2"
                        : "text-gray-500 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300"
                    }
                    rounded-t-lg 
                    whitespace-nowrap
                  `}
                >
                  {value}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
