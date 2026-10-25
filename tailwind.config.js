/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#faf7f2',
          100: '#f4efe4',
          200: '#e8ddc9',
          300: '#dbc7a7',
          400: '#cca980',
          500: '#c08f61',
          600: '#a6724b',
          700: '#86553d',
          800: '#6f4535',
          900: '#5b3a2e',
          950: '#321d17',
        },
        ancient: {
          dark: '#141416',
          card: '#1d1e22',
          border: '#2e3038',
          accent: '#c99a58',
          crimson: '#a33327',
          jade: '#2d6a4f',
          bronze: '#b07d48',
          indigo: '#2b3a67',
        }
      },
      fontFamily: {
        serif: ['"Noto Serif TC"', '"Songti TC"', 'Georgia', 'serif'],
        sans: ['"Noto Sans TC"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
