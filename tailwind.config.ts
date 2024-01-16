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
      screens: {
        // 'tablet': '640px',
        // // => @media (min-width: 640px) { ... }

        // 'laptop': '1024px',
        // // => @media (min-width: 1024px) { ... }
        laptop: "1024px",
        desktop: "1440px",
        // => @media (min-width: 1280px) { ... }
      },
      animation: {
        "hue-rotate": "hue-rotate 3s linear infinite forwards",
      },
      keyframes: {
        "hue-rotate": {
          "0%": {
            filter: "hue-rotate(0deg)",
          },
          "100%": {
            filter: "hue-rotate(360deg)",
          },
        },
      },

      colors: {
        white: "#ffffff",
        "black-5": "#0B0B0F",
        "black-12": "#1A1B23",
        "black-20": "#2B2C3B",
        "black-40": "#565976",
        "black-60": "#898CA9",
        "motion-light": "#FFC34D",
        power: "#1AD9FF",
        "brand1-6": "#165DFF",
        gray: "#DDDDDD",
        "line/2": "#E5E6EB",
        "line/3": "#C9CDD4",
        "text/3": "#86909C",
        cyan: "#0FC6C2",
        "purple-grad": "rgba(24, 75, 255, 0.40)",
        success: "#0DBB7C",
        error: "#FF8282",
        accent: "#b102cd",
      },
      backgroundImage: {
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",

        "radial-gradient-1":
          " radial-gradient(circle, rgba(255,255,255,0)  40%, #0B0B0F 100%), url('/bg-gradient.svg')",
        "accent-gradient": "linear-gradient(101deg, #1f8ebe 0%, #b102cd 100%);",
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
