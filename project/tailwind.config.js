/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'navy': '#0a0b14',
        'navy-light': '#1a1b26',
      },
    },
  },
  plugins: [],
};