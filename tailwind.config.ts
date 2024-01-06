import type { Config } from "tailwindcss";
// const plugin = require("tailwindcss/plugin");
// import BgGradientSvg from "/public/bg-gradient.svg";

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
        "purple-grad": "rgba(24, 75, 255, 0.40)",
      },
      backgroundImage: {
        // "gradient-radial":
        //   " radial-gradient(circle, rgba(11,11,15,1)  0%, rgba(255,255,255,0) 100%)",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",

        "radial-gradient-1":
          " radial-gradient(circle, rgba(255,255,255,0)  0%, #0B0B0F 100%), url('/bg-gradient.svg')",
        "accent-gradient":
          "linear-gradient(101deg, #1F8EBE -5.36%, #440495 29.46%, #440495 56.03%, #B102CD 81.92%);",
      },
    },
  },
  plugins: [
    // plugin(function plugin1({ addUtilities, addComponents, e, config }) {
    //   // Add your custom styles here
    // }),
  ],
};
export default config;
