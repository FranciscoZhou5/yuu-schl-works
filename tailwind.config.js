/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--inter-font)"],
      },
      colors: {
        "fuchsia-blue": {
          50: "#f1f2fc",
          100: "#e6e7f9",
          200: "#d2d3f3",
          300: "#b6b6eb",
          400: "#9e98e1",
          500: "#8c7fd5",
          600: "#7159c1",
          700: "#6a55ad",
          800: "#57478c",
          900: "#493e71",
          950: "#2b2442",
        },
      },

      textColor: {},
    },
  },
  plugins: [],
};
