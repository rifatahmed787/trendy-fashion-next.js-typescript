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
        primary:["Petrona", "serif"],
        secondary:["Amiri", "serif"],
        tertiary:["Open Sans", "sans-serif"],
      },
      colors: {
        gray: {
          50: "#F9F9FB",
          100: "#F2F2F7",
          200: "#EAEAF0",
          300: "#D0D0DD",
          400: "#9899B3",
          500: "#666885",
          600: "#474967",
          700: "#343654",
          800: "#1D1F39",
          900: "#141420",
        },
        dark: {
          100: "#040626",
          200: "#03041C",
          300: "#020313",
          400: "#02020E",
          500: "#010109",
          600: "#010105",
        },
        primary: {
          100: "#FFA801",
          200: "#FAC213",
          300: "#da9100",
        },
        secondary: {
          100: "#ffeac3",
          200: "#ffe1a9",
          300: "#ffd990",
          400: "#ffd076",
        },
        footer: "#CFF1FF",
        button: "#05072F",
        background: "#39BFE1",
        grayscale: {
          90: "#464646",
          100: "#1A1A1A",
        },
        v2: {
          new1: "#211E52",
          new2: "#AA7B2F",
        },
      },
      boxShadow: {
        'custom': '30px 30px 20px #D0D0DD, -40px -40px 38px #FFA801',
        'custom-primary': "0px 0px 50px 10px rgba(227, 230, 236, 0.8)",
      },
      animation: {
        "slide-in": "slide-in 0.5s forwards",
        "slide-out": "slide-out 0.5s forwards",
      },
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;