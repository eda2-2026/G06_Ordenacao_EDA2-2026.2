/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        correios: {
          blue: '#00416b',
          'blue-dark': '#002845',
          yellow: '#ffe600',
          'yellow-hover': '#ebd300',
          gray: '#f4f6f8'
        }
      }
    },
  },
  plugins: [],
}
