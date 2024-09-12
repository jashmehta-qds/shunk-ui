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
      keyframes: {
        fadeInRight20: {
          '0%': { opacity: "0", transform: 'translateX(20px)' },
          '100%': { opacity: "1", transform: 'translateX(0)' },
        },
        fadeInRight30: {
          '0%': { opacity: "0", transform: 'translateX(30px)' },
          '100%': { opacity: "1", transform: 'translateX(0)' },
        },
        fadeInRight40: {
          '0%': { opacity: "0", transform: 'translateX(40px)' },
          '100%': { opacity: "1", transform: 'translateX(0)' },
        },
        fadeInRight50: {
          '0%': { opacity: "0", transform: 'translateX(50px)' },
          '100%': { opacity: "1", transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in-right-20': 'fadeInRight20 1s ease-in-out',
        'fade-in-right-30': 'fadeInRight30 1s ease-in-out',
        'fade-in-right-40': 'fadeInRight40 1s ease-in-out',
        'fade-in-right-50': 'fadeInRight50 1s ease-in-out',
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
