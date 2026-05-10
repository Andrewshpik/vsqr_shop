import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#f4efe6",
          dark: "#e8e1d2",
          light: "#faf6ee",
        },
        ink: {
          DEFAULT: "#161210",
          soft: "#3a342e",
          muted: "#7a7167",
          line: "rgba(22, 18, 16, 0.08)",
        },
        clay: {
          50: "#fdf5ee",
          100: "#fbe8d6",
          200: "#f6cca8",
          300: "#efa874",
          400: "#e57f43",
          500: "#d35a23",
          600: "#b8451f",
          700: "#963820",
          800: "#7a2f1f",
          900: "#5b251a",
        },
        sage: {
          500: "#637b58",
          700: "#3f4e38",
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
        soft: "0 20px 50px -25px rgba(22, 18, 16, 0.25)",
        glow: "0 0 0 1px rgba(22, 18, 16, 0.06), 0 30px 60px -30px rgba(22, 18, 16, 0.3)",
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
