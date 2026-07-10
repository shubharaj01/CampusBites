/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        sans: ["'Inter'", "sans-serif"]
      },
      colors: {
        ink: "#1C1B29",
        paper: "#FBFAF8",
        line: "#E7E4DD",
        brand: {
          50: "#EEF0FF",
          100: "#E0E3FF",
          400: "#6C6EF5",
          500: "#4F46E5",
          600: "#4338CA",
          700: "#3730A3"
        },
        accent: "#F0A868"
      },
      boxShadow: {
        card: "0 1px 2px rgba(28,27,41,0.04), 0 8px 24px rgba(28,27,41,0.06)",
        cardHover: "0 4px 8px rgba(28,27,41,0.06), 0 16px 32px rgba(28,27,41,0.10)"
      },
      borderRadius: {
        xl2: "1.25rem"
      }
    }
  },
  plugins: []
};
