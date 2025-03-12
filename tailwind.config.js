/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
       fontFamily: {
        rubik: [' Rubik-Regular', 'sans-serif'],
        'rubik-medium': [' Rubik-Medium', 'sans-serif'],
        'rubik-black': [' Rubik-Black', 'sans-serif'],
        'rubik-bold': ['Rubik-Bold', 'sans-serif'],
        'rubik-light': ['Rubik-Light', 'sans-serif'],
      } ,
      colors: {
        "primary": {
          100:'#8a00c20A',
          200:'#8a00c21A',
          300:'#8a00c2'
        
        },
        accent: {
          100: '#FBFBFD',
        },
        black: {
          DEFAULT: '#000000',
        },
        danger: {
          DEFAULT: '#FF0000'
        }
  


      }

    },
    
  },
  plugins: [],
}