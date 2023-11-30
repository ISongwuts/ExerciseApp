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
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      'CollapseCard-xl': '1815px',
      'CollapseCard-lg': '1405px',
      'CollapseCard-sm': '845px',
      'CollapseCard-tiny': '685px',
    }
    
  },
  plugins: [require('@tailwindcss/typography'),],
}