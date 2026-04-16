import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)", "var(--font-sans)"],
      },
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          light:   "var(--color-primary-light)",
          muted:   "var(--color-primary-muted)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          light:   "var(--color-accent-light)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          alt:     "var(--color-surface-alt)",
        },
        foreground: "var(--color-foreground)",
        muted:      "var(--color-muted)",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        "4xl":   "2rem",
      },
      maxWidth: {
        content: "var(--content-width)",
      },
      boxShadow: {
        veil: "0 24px 80px rgba(23, 51, 37, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
