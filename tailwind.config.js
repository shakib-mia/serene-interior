/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        lg: "0",
      },
      screens: {
        sm: "100%",
        md: "768px",
        lg: "1000px",
        xl: "1320px",
      },
    },
    fontFamily: {
      amaranth: ["Amaranth", "sans-serif"],
      "instrument-sans": ["Instrument Sans", "sans-serif"],
    },
    extend: {
      keyframes: {
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        rotateReverse: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" }, // Reverse direction
        },
      },
      animation: {
        rotate: "rotate 6s linear infinite", // Clockwise
        rotateReverse: "rotateReverse 6s linear infinite", // Counterclockwise
      },
      colors: {
        grey: { DEFAULT: "#c2c2c2", dark: "#1B1B1B", light: "#EFEFEF" },
      },
    },
  },
  plugins: [],
};
