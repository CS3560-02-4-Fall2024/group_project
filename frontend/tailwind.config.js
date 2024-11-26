/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tan: "#fffcef",
        dg: "#465b43",
        g: "#95b78e",
      },
      screens: {
        'fourkay': { 'raw' : '(min-width: 2200px)'},
        'twelve': { 'raw' : '(max-width: 700px)'}
      }
    },
  },
  plugins: [],
}

