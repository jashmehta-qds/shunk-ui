"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const menuItems = [
  { title: "Home", href: "/" },
  { title: "Byob", href: "/byob" },
  { title: "Leaderboard", href: "/leaderboard" },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky  top-0 z-50  backdrop-blur-sm"
    >
      <nav className=" mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-3xl text-mainBlue font-silkscreen"
          >
            Shunk
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Menu Items Container */}
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 border border-mainBlue">
              <ul className="flex space-x-8">
                {menuItems.map((item) => (
                  <motion.li
                    key={item.title}
                    whileHover={{ scale: 1.05 }}
                    className="relative group"
                  >
                    <Link href={item.href} className=" text-mainBlue">
                      {item.title}
                      <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-mainBlue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Launch App Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-mainBlue text-white px-8 py-2.5 rounded-full font-medium hover:bg-blue-600 transition-colors duration-300 shadow-lg shadow-mainBlue/25"
            >
              Launch App
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className=" shadow-xl md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? "auto" : 0,
          }}
          className="md:cursor-pointer   md:hidden"
        >
          <div
            className={`mt-4 bg-slate-400	 w-11/12 fixed ${
              isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
            }	  bg-opacity-50  rounded-2xl border border-white/20 overflow-hidden`}
          >
            <ul className="py-2">
              {menuItems.map((item) => (
                <motion.li key={item.title} className="px-4">
                  <Link
                    href={item.href}
                    className="block py-3 text-blue-700 font-medium	  transition-colors duration-300"
                  >
                    {item.title}
                  </Link>
                </motion.li>
              ))}
              {/* Mobile Launch App Button */}
              <li className="px-4 py-3">
                <button className="w-full bg-mainBlue text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue-600 transition-colors duration-300 shadow-lg shadow-mainBlue/25">
                  Launch App
                </button>
              </li>
            </ul>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
}
