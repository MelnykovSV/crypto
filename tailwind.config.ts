import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
        mont: ["var(--font-montserrat)"],
      },
      colors: {
        white: "#ffffff",
        "black-5": "#0B0B0F",
        "black-12": "#1A1B23",
        "black-20": "#2B2C3B",
        "black-40": "#565976",
        "black-60": "#898CA9",
        accent: "#F54C18",
        "motion-light": "#FFC34D",
        power: "#1AD9FF",
        "brand1-6": "#165DFF",
        gray: "#DDDDDD",
        "line/2": "#E5E6EB",
        "line/3": "#C9CDD4",
        "text/3": "#86909C",
        cyan: "#0FC6C2",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
