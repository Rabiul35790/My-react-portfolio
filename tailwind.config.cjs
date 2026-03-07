/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        muted: "var(--color-muted)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        tertiary: "var(--color-tertiary)",
        text1: "var(--color-text-1)",
        text2: "var(--color-text-2)",
        text3: "var(--color-text-3)"
      },
      fontFamily: {
        display: ["Clash Display", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      fontSize: {
        hero: "clamp(4rem, 10vw, 9rem)",
        section: "clamp(2rem, 5vw, 4.5rem)",
        label: ["0.75rem", { letterSpacing: "0.2em", textTransform: "uppercase" }]
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" }
        },
        pulseClick: {
          "0%": { transform: "translate(-50%, -50%) scale(1)", opacity: "0.55" },
          "100%": { transform: "translate(-50%, -50%) scale(2.4)", opacity: "0" }
        }
      },
      animation: {
        ticker: "ticker 32s linear infinite",
        pulseClick: "pulseClick 360ms ease-out"
      }
    }
  },
  plugins: []
};
