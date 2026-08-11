/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2f7ff',
          100: '#e0ecff',
          500: '#3d63dd',
          600: '#2f4fc2',
          700: '#243d97',
        },
      },
    },
  },
  plugins: [],
};
