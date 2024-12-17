/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          "0%": { transform: "translateY(-10px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        slideIn: "slideIn 0.2s ease-out",
        fadeIn: "fadeIn 0.2s ease-out",
      },
      colors: {
        primary: {
          light: "#6366F1", // Indigo-500
          DEFAULT: "#4F46E5", // Indigo-600
          dark: "#4338CA",
        },
      },
    },
  },
  plugins: [],
};
