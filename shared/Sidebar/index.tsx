import { AssetsImg } from "@/public";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export interface SidebarProps {}
export interface SidebarMenuItems {
  id: number | string;
  name: React.ReactNode;
  redirection?: string;
  lottieIcon: string;
}
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
    name: "Leaderboard",
    redirection: "/leaderboard",
    lottieIcon: AssetsImg.ic_leaderboard,
  },
  {
    id: 4,
    name: "Portfolio",
    redirection: "/portfolio/invested",
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

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      setIsCollapsed(true);
    }
  }, [pathname]);
  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div
      className={`z-10	opacity-0 w-0 pointer-events-none	lg:pointer-events-auto lg:w-fit lg:opacity-100 lg:w-fit ${
        isCollapsed ? "lg:w-20" : "lg:w-80 xl:w-96"
      } transition-all duration-400 ease-in-out xl:p-4 p-0 lg:p-2 bg-white flex-col  items-start gap-5 inline-flex border-r border-stone-200	`}
    >
      <div className="w-full pt-4 justify-between items-center gap-2.5 inline-flex">
        <div>
          <span
            className={`font-silkscreen text-3xl transition-opacity duration-400 ease-in-out `}
          >
            {isCollapsed ? "S" : "SHUNK"}
          </span>
        </div>
        <div
          className={`w-6 h-6 relative cursor-pointer transform transition-transform duration-400 ease-in-out`}
          onClick={toggleSidebar}
          style={{ transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <Image
            className="w-6 h-6"
            alt="hamburger-right"
            width={24}
            height={24}
            src={AssetsImg.ic_hamburgerSidebar}
          />
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
                <div
                  className={`flex p-3  rounded-lg  ${
                    menuItem.redirection === pathname
                      ? "bg-blue-50"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="items-center gap-3 flex transition-all duration-400 ease-in-out">
                    <Image
                      className={"transition-all duration-400 max-w-24"}
                      src={menuItem.lottieIcon}
                      alt={`MenuIcon${menuItem.id}`}
                      width={isCollapsed ? 24 : 22}
                      height={isCollapsed ? 24 : 22}
                    />

                    <h2
                      style={{ opacity: isCollapsed ? 0 : 1 }}
                      className={`text-gray-500 text-sm font-medium leading-snug `}
                    >
                      {menuItem.name}
                    </h2>
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
                <div
                  className={`p-3 rounded-lg flex  ${
                    settingsItem.redirection === pathname
                      ? "bg-gray-100"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className=" items-center gap-3 flex transition-all duration-400 ease-in-out">
                    <Image
                      className={"transition-all duration-400 max-w-24"}
                      src={settingsItem.lottieIcon}
                      alt={`settingIcon${settingsItem.id}`}
                      width={isCollapsed ? 24 : 22}
                      height={isCollapsed ? 24 : 22}
                    />

                    <h2
                      style={{ opacity: isCollapsed ? 0 : 1 }}
                      className="text-gray-500 text-sm font-medium leading-snug"
                    >
                      {settingsItem.name}
                    </h2>
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
