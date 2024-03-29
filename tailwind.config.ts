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

      container: {
        padding: {
          DEFAULT: "20px",
          sm: "50px",
        },
      },
      screens: {
        "large-mobile": "480px",
        tablet: "640px",
        laptop: "1024px",
        "small-desktop": "1280px",
        desktop: "1440px",
        "large-desktop": "1536px",
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
        "accent-blue": "#1f8ebe",
        "accent-light": "rgba(177, 2, 205, 0.4)",
        "accent-dark": "#933FFE",
        "accent-purple": "#B982FF",
      },
      backgroundImage: {
        "gradient-conic":
          "conic-gradient(from 90deg at 50% 50%, #b102cd, #933FFE, #1f8ebe, #933FFE, #b102cd), radial-gradient(circle, rgba(255,255,255,0)  40%, #0B0B0F 100%)",
        heroImage: "url('/hero-bg-img.png')",
        "radial-gradient-1":
          " radial-gradient(circle, rgba(255,255,255,0)  40%, #0B0B0F 100%), url('/bg-gradient.svg')",
        "radial-gradient-2": "  url('/bg-gradient-orange.svg')",
        "radial-gradient-blue": "  url('/bg-gradient-blue.svg')",
        looper: "  url('/Looper.svg')",
        "star-1": "  url('/star-1.svg')",
        "star-2": "  url('/star-2.svg')",
        "star-3": "  url('/star-3.svg')",
        "accent-gradient": "linear-gradient(101deg, #1f8ebe 0%, #b102cd 100%);",
        "darken-gradient":
          "linear-gradient(to bottom, rgb(0, 0, 0, 0.5), rgb(0, 0, 0, 0.5));",
        "auth-accent-gradient":
          "linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)",
        "progress-gradient":
          "linear-gradient(101deg, #FF8282 0%, #0DBB7C 100%);",
      },
    },
  },
};
export default config;
