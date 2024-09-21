import { AssetsImg } from "@/public";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export interface SidebarProps {}
export interface SidebarMenuItems {
  id: number | string;
  name: React.ReactNode;
  redirection?: string;
  lottieIcon: string;
}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const MENU_ITEMS: SidebarMenuItems[] = [
    {
      id: 1,
      name: "Home",
      redirection: "/",
      lottieIcon: AssetsImg.ic_home,
    },
    {
      id: 2,
      name: "BYOB",
      redirection: "/byob",
      lottieIcon: AssetsImg.ic_packs,
    },
    {
      id: 3,
      name: "LeaderBoard",
      redirection: "/leaderboard",
      lottieIcon: AssetsImg.ic_leaderboard,
    },
    {
      id: 4,
      name: "Portfolio",
      redirection: "/portfolio",
      lottieIcon: AssetsImg.ic_portfolio,
    },
  ];
  const SETTINGS_ITEM: SidebarMenuItems[] = [
    {
      id: 1,
      name: "Profile",
      redirection: "/profile",
      lottieIcon: AssetsImg.ic_profile,
    },
    {
      id: 2,
      name: "Settings",
      redirection: "/settings",
      lottieIcon: AssetsImg.ic_settings,
    },
    {
      id: 3,
      name: "Logout",
      redirection: "/logout",
      lottieIcon: AssetsImg.ic_logout,
    },
  ];

  return (
    <div
      className={`z-10	 ${
        isCollapsed ? "w-20" : "w-80 xl:w-96"
      } transition-all duration-400 ease-in-out xl:p-4 p-2 bg-white flex-col justify-start items-start gap-5 inline-flex border-r`}
    >
      <title></title>
      {/* Top Bar with SVG and Brand Name */}
      <div className="w-full pt-4 justify-between items-center gap-2.5 inline-flex">
        <div>
          <span
            className={`font-silkscreen text-3xl transition-opacity duration-400 ease-in-out `}
          >
            {isCollapsed ? "S" : "SHUNK"}
          </span>
        </div>
        <div
          className="w-6 h-6 relative bg-white transform transition-transform duration-400 ease-in-out"
          onClick={toggleSidebar}
          style={{ transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Menu">
              <rect width="24" height="24" fill="white" />
              <path
                id="icon"
                d="M13 6H21M3 12H21M7 18H21"
                stroke="#1F2937"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </div>
      </div>

      {/* Menu Items */}
      <div className="w-full">
        <div className="w-full h-8 px-3 items-center flex">
          <h6 className="text-gray-500 text-xs font-semibold leading-4">
            {isCollapsed ? "M" : "MENU"}
          </h6>
        </div>
        <ul className="flex-col gap-1 flex">
          {MENU_ITEMS.map((menuItem) => (
            <li key={menuItem.id}>
              <Link href={menuItem.redirection}>
                <div>
                  <div className="flex p-3 bg-white rounded-lg items-center">
                    <div className="h-5 gap-3 flex transition-all duration-400 ease-in-out">
                      <div className="relative">
                        <Image
                          src={menuItem.lottieIcon}
                          alt={`MenuIcon${menuItem.id}`}
                          width={isCollapsed ? 24 : 22}
                          height={isCollapsed ? 24 : 22}
                        />
                      </div>
                      {!isCollapsed && (
                        <h2 className="text-gray-500 text-sm font-medium leading-snug">
                          {menuItem.name}
                        </h2>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Settings */}
      <div className="w-full">
        <div className="w-full h-8 px-3 items-center flex">
          <h6 className="text-gray-500 text-xs font-semibold leading-4">
            {isCollapsed ? "S" : "SETTINGS"}
          </h6>
        </div>
        <ul className="flex-col gap-1 flex">
          {SETTINGS_ITEM.map((settingsItem) => (
            <li key={`setting${settingsItem.id}`}>
              <Link href={settingsItem.redirection}>
                <div>
                  <div className="p-3 rounded-lg items-center inline-flex">
                    <div className="h-5 items-center gap-3 flex transition-all duration-400 ease-in-out">
                      <div className="relative">
                        <Image
                          src={settingsItem.lottieIcon}
                          alt={`settingIcon${settingsItem.id}`}
                          width={isCollapsed ? 24 : 22}
                          height={isCollapsed ? 24 : 22}
                        />
                      </div>
                      {!isCollapsed && (
                        <h2 className="text-gray-500 text-sm font-medium leading-snug">
                          {settingsItem.name}
                        </h2>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
