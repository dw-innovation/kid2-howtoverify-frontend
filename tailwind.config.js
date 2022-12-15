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
        grey: {
          header: "#fafafa",
          background: "#EEEEEE",
          darker: "#5D5D5E",
          dark: "#737373",
          light: "#BDBDBD",
        },
        purple: {
          primary: "#8E44AD",
          inactive: "#DDCBE5",
          nextClick: "#B382C6",
          nodeInfo: "#D6BFE0",
          background: "#E8DDED"
        },
        blue: {
          primary: "#2980B9",
          inactive: "#BAD4E5",
          nextClick: "#72A9CE",
          nodeInfo: "#B6D2E4",
          background: "#D9E6EF"
        },
        green: {
          primary: "#27AE60",
          inactive: "#BAE2CB",
          nextClick: "#66C58E",
          nodeInfo: "#B6E1C7",
          background: "#D9EDE1"
        },

        yellow: {
          primary: "#F0C000",
          inactive: "#F5E295",
          nextClick: "#F3D663",
          nodeInfo: "#F6E7A9",
          background: "#F7F0D3"
        },
        red: {
          primary: "#C0392B",
          inactive: "#E8BFBB",
          nextClick: "#D47C73",
          nodeInfo: "#E7BCB6",
          background: "#F0DCD9"
        },
        primary: "#0096FA",
      },
    },
  },
  plugins: [],
};
