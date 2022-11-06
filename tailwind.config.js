const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: ["bg-purple", "bg-yellow", "bg-green", "bg-red", "bg-blue"],
  theme: {
    extend: {
      fontFamily: {
        noto: ["Noto Sans", ...defaultTheme.fontFamily.sans],
        montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
        georgia: ["Georgia", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        lightGrey: "#F8F8F8",
        blue: "#23A6F0",
        darkBlue: "#3FA9F5",
        purple: "#791EBF",
        yellow: "#DBC700",
        red: "#E3336A",
        green: "#40A51A",
      },
    },
  },
  plugins: [],
};
