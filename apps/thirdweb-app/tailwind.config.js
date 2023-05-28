/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#0A0708",
          secondary: "#444444",
          tertiary: "#747474",
          optional: "#B1B1B1",
        },
      },
    },
    fontFamily: {
      amarnath: ["var(--font-amarnath)"],
    },
    animation: {
      pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
    ketframes: {
      pulse: {
        "0%, 100%": { opacity: 1 },
        "50%": { opacity: 0 },
      },
    },
  },
  plugins: [],
};
