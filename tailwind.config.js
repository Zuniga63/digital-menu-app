/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const prettier = require('prettier-plugin-tailwindcss');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif', ...defaultTheme.fontFamily.sans],
        display: ['Zen Dots', 'cursive', ...defaultTheme.fontFamily.sans],
        hand: ['Dancing Script', 'cursive', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        'float-button': '2px 2px 3px #999',
        'light-neon': '0 0 0 5px rgba(255, 255, 255, .8), 0 0 10px 5px rgba(255, 255, 255, .3)',
        'new-tag': '2px 2px 6px 0px rgb(50 50 50)',
      },
      colors: {
        'gray-dark': '#343a40',
        'yellow-light': '#f1c40f',
        dark: '#212529',
        light: '#f8f9fa',
      },
      gridTemplateColumns: {
        'nav-item': 'auto 1fr auto',
        'auto-fr': 'auto 1fr',
      },
      zIndex: {
        back: '-1',
        'back-2': '-2',
        fixed: '100',
        modal: '1000',
        preload: '1100',
      },
    },
  },
  plugins: [prettier],
};
