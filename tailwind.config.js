/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        // Light theme
        VeryLightGray: "hsl(0, 0%, 98%)",
        VeryLightGrayishBlue: "hsl(236, 33%, 92%)",
        LightGrayishBlue: "hsl(233, 11%, 84%)",
        DarkGrayishBlue1: "hsl(236, 9%, 61%)",
        VeryDarkGrayishBlue: "hsl(235, 19%, 35%)",

        // Dark Theme
        VeryDarkBlue: "hsl(235, 21%, 11%)",
        VeryDarkDesaturatedBlue: "hsl(235, 24%, 19%)",
        LightGrayishBlue: "hsl(234, 39%, 85%)",
        LightGrayishBlueHover: "hsl(236, 33%, 92%)",
        DarkGrayishBlue2: "hsl(234, 11%, 52%)",
        VeryDarkGrayishBlue1: "hsl(233, 14%, 35%)",
        VeryDarkGrayishBlue2: "hsl(237, 14%, 26%)",
      },

      fontFamily: {
        JosefinSans: "Josefin Sans, sans-serif",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
