/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'body': ['"LomoWebPixel LT Std 5"', ]
    },
    colors: {
      'PrimaryColors': '#FF5858', 
      'InactivePrimary': '#B84848',
      'PrimaryBG': '#242424'
    },
    borderRadius: {
      'myConf': '20px'
    },
    width: {
      '128': '36rem',
    }
  },
  plugins: [],
}