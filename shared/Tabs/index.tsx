import React from "react";
import { TabsProps } from "./typings";
import Link from "next/link";

export const Tabs: React.FC<TabsProps> = ({ tabList, onChange, selected }) => {
  return (
    <div className="tabs">
      <div className="block">
        <ul className="flex border-b border-gray-200 space-x-3 transition-all duration-300 -mb-px">
          {tabList.map(({ id, value, redirection }) => {
            return (
              <li
                // onClick={() => {
                //   onChange(id);
                // }}
                key={`tabs-${id}`}
              >
                <Link
                  data-tab="tabs-with-underline-1"
                  role="tab"
                  className={`inline-block py-4 px-6 text-gray-500 hover:text-gray-800 font-medium border-b-2 border-transparent tab-active:border-b-indigo-600 tab-active:text-indigo-600 ${
                    selected === id ? "active" : ""
                  } tablink whitespace-nowrap`}
                  href={redirection}
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
