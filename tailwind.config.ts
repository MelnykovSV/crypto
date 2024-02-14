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
        "large-mobile": "480px",
        tablet: "640px",
        // // => @media (min-width: 640px) { ... }

        // 'laptop': '1024px',
        // // => @media (min-width: 1024px) { ... }
        laptop: "1024px",
        desktop: "1440px",
        "large-desktop": "1536px",
        // => @media (min-width: 1280px) { ... }
      },
      animation: {
        "hue-rotate": "hue-rotate 3s linear infinite forwards",
        rotate: "rotate 3s linear infinite forwards",
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
        rotate: {
          "0%": {
            transform: "rotate(0)",
          },
          "100%": {
            transform: "rotate(360deg)",
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
        "transparent-gray": "rgba(176, 176, 176, 0.1)",
        success: "#0DBB7C",
        error: "#FF8282",
        accent: "#b102cd",
        "accent-light": "rgba(177, 2, 205, 0.4)",
        "accent-dark": "#933FFE",
      },
      backgroundImage: {
        "gradient-conic":
          "conic-gradient(from 90deg at 50% 50%, #b102cd, #933FFE, #1f8ebe, #933FFE, #b102cd), radial-gradient(circle, rgba(255,255,255,0)  40%, #0B0B0F 100%)",

        "radial-gradient-1":
          " radial-gradient(circle, rgba(255,255,255,0)  40%, #0B0B0F 100%), url('/bg-gradient.svg')",
        "accent-gradient": "linear-gradient(101deg, #1f8ebe 0%, #b102cd 100%);",
        "auth-accent-gradient":
          "linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)",
        "progress-gradient":
          "linear-gradient(101deg, #FF8282 0%, #0DBB7C 100%);",
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
