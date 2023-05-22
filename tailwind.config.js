/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
