/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}'
  ],
  theme: {
    extend: {
      colors: {
        'lilac': 'rgb(173, 30, 255)',
        'orange': '#D95204'
      }
    },
  },
  plugins: [],
}

