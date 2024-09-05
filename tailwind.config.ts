import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        silkscreen: ["Silkscreen", "cursive"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        "70vh": "70vh",
        "60vw": "60vw",
      },
    },
    colors: {
      overlay: "rgba(0,0,0,0.25)",
      customBlue: "rgb(40, 120, 200)",
    },
    zIndex: {
      "1000": "1000",
    },
  },
  plugins: [],
};
export default config;
