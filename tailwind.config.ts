import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "rgb(var(--paper) / <alpha-value>)",
          light: "rgb(var(--paper-light) / <alpha-value>)",
          dark: "rgb(var(--paper-dark) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          soft: "rgb(var(--ink-soft) / <alpha-value>)",
          muted: "rgb(var(--ink-muted) / <alpha-value>)",
        },
        clay: {
          50: "#ecfbf8",
          100: "#d1f5ee",
          200: "#a3ebdd",
          300: "#6cdac6",
          400: "#3ec2ab",
          500: "#1ea693",
          600: "#0e8b7a",
          700: "#0c7064",
          800: "#0c5851",
          900: "#0a443f",
        },
        sage: {
          500: "#6aa8a0",
          700: "#3f6e68",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      boxShadow: {
        soft: "0 20px 50px -25px rgb(var(--ink) / 0.25)",
        glow: "0 0 0 1px rgb(var(--ink) / 0.06), 0 30px 60px -30px rgb(var(--ink) / 0.3)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
