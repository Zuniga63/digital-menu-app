/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const prettier = require('prettier-plugin-tailwindcss');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif', ...defaultTheme.fontFamily.sans],
        display: ['Zen Dots', 'cursive', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [prettier],
};
