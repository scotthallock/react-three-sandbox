/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './client/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      aspectRatio: {
        '1.91/1': '1.91 / 1',
      },
      transitionProperty: {
        width: 'width',
      },
    },
  },
  plugins: [require('autoprefixer')],
};
