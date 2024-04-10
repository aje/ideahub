import type { Config } from "tailwindcss";
import {nextui} from '@nextui-org/theme'
const defaultTheme = require('tailwindcss/defaultTheme')

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        'sans': ['Century Gothic', ...defaultTheme.fontFamily.sans],
        'serif': ['Proxima Nova', ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        '240%': '240%',
        '200%': '200%',
        '170%': '170%',
        '140%': '140%',
        '160%': '160%',
        '150%': '150%',
        '100%': '100%',
        '90%': '90%',
        '80%': '80%',
        '70%': '70%',
        '60%': '60%',
        '50%': '50%',
        '45%': '45%',
        '40%': '40%',
        '35%': '35%',
        '30%': '30%',
        '25%': '25%',
        '20%': '20%',
        '10%': '10%',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
    corePlugins: {
      preflight: false,
    }
};
export default config;
