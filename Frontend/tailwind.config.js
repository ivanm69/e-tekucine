/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        'color-theme1': '#edf2f4',
        'color-card-theme1':'8d99ae',
        'color-theme1-hover':'#ef233c'
      }
    },
  },
  plugins: [],
}

