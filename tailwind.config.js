/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    backgroundColor: {
      transparent: "transparent",
      current: "currentColor",
      "yellow-brown": "#D9B650",
    },
    // 'tahiti': {
    //   light: '#67e8f9',
    //   DEFAULT: '#06b6d4',
    //   dark: '#0e7490',
    // },
    extend: {},
    screens: {
      // 響應式斷點
      sm: "640px",
      md: "768px",
      xl: "1280px",
      "2xl": "1536px",
    },
    fontFamily: {
      sans: [""],
      serif: ["Noto Serif HK"],
    },
    // fontSize: {
    //   sm: '0.8rem',
    //   base: '1rem',
    //   xl: '1.25rem',
    //   '2xl': '1.563rem',
    //   '3xl': '1.953rem',
    //   '4xl': '2.441rem',
    //   '5xl': '3.052rem',
    // },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      1.5: "1.5px",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
    },
  },
  plugins: [],
};
