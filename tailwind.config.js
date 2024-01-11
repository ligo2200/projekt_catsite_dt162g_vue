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
        'seaweedgreen': '#3A400E',
        'orange': '#D95204'
      }
    },
  },
  plugins: [],
}

