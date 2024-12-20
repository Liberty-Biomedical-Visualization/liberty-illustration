import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "duration-75",
    "duration-100",
    "duration-150",
    "duration-200",
    "duration-300",
    "duration-500",
    "duration-700",
    "duration-1000",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          50: "rgb(var(--accent-50))",
          100: "rgb(var(--accent-100))",
          200: "rgb(var(--accent-200))",
          300: "rgb(var(--accent-300))",
          400: "rgb(var(--accent-400))",
          500: "rgb(var(--accent-500))",
          600: "rgb(var(--accent-600))",
          700: "rgb(var(--accent-700))",
          800: "rgb(var(--accent-800))",
          900: "rgb(var(--accent-900))",
          950: "rgb(var(--accent-950))",
        },
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
      },
      content: {
        pipe: "'|'",
      },
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
      },
      spacing: {
        "14": "3.5rem",
        "128": "32rem",
        "192": "48rem",
        "260": "65rem",
      },
    },
  },
  plugins: [],
};

export default config;
