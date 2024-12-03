import type { Config } from "tailwindcss";
import { colors } from "./constants/colors";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "770px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      width: {
        "800": "50rem",
      },
      colors: {
        ...colors, // Adding your custom colors
        overlay: "rgba(0,0,0,0.25)",
        mainBlue: "#1d4ed8",
        primary: "#0F62FE",
        accent: "#4FB286",
        dark: "#0A0A0A",
        light: "#F5F5F5",
      },
      keyframes: {
        fillStar: {
          "0%": { fill: "transparent" },
          "100%": { fill: colors.clrIndigo },
        },
        fadeInRight20: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeInRight30: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeInRight40: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeInRight50: {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fill-star": {
          "0%": { fill: "none" },
          "100%": { fill: "rgb(37 99 235)" },
        },
      },
      animation: {
        "fade-in-right-20": "fadeInRight20 1s ease-in-out",
        "fade-in-right-30": "fadeInRight30 1s ease-in-out",
        "fade-in-right-40": "fadeInRight40 1s ease-in-out",
        "fade-in-right-50": "fadeInRight50 1s ease-in-out",
        fillStar: "fillStar 0.5s forwards",
        "fill-star": "fill-star 0.5s ease forwards",
      },
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
        "50vh": "50vh",
      },
    },
    zIndex: {
      "1000": "1000",
    },
  },
  plugins: [],
};
export default config;
