/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html','./src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors:{
        primary: '#1D4ED8', // Custom primary color
        secondary: '#09555c',
        font: '#EDF4F5', // Custom secondary color
        accent: '#F59E0B', // Custom accent color
        background: '#F3F4F6', // Custom background color

      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light"], 
  },
}
