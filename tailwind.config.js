/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/*.{Vue,html,js}"],
  theme: {
    backgroundColor:{
      transparent: 'transparent',
      current: 'currentColor',
      'yellow-brown': '#D9B650',
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
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '1.5':'1.5px',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    }
  },
  plugins: [],
}

