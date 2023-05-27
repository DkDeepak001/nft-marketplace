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
  },
  plugins: [],
};
