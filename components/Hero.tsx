"use client";

import { motion } from "framer-motion";

const colorBlue = { color: "#2563eb" };
export default function Hero() {
  return (
    <div className="min-h-dvh	 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" p-8 sm:p-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-6 leading-tight text-center"
          >
            Collective <span className="line-through">Community</span>{" "}
            <span style={{ color: "#1d4ed8" }}>DEGEN</span> Investing
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-black mb-12 max-w-2xl mx-auto text-center"
          >
            BUIDL your bags, Make $$$ together, Show off your CABAL
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-skyBlue text-white px-8 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-shadow"
              style={{ background: "#2563eb" }}
            >
              Launch App
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ ...colorBlue, borderColor: "#2563eb" }}
              className="bg-white/10  px-8 py-3 rounded-full font-medium backdrop-blur-sm border  hover:bg-white/20 transition-colors"
            >
              Learn More
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
