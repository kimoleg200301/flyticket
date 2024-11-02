/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,tsx}',
  ],
  theme: {
    extend: {
      height: {
        '70': '70px',
        '90': '90px',
        '200': '200px',
        '300': '300px',
        '350': '350px',
        '400': '400px',
        '450': '450px',
        '500': '500px',
        '550': '550px'
      },
      width: {
        '70': '70px',
        '90': '90px',
        '200': '200px',
        '300': '300px',
        '350': '350px',
        '400': '400px',
        '450': '450px',
        '500': '500px',
        '550': '550px',
        '600': '600px',
        '700': '700px'
      },
      borderRadius: {
        '12': '12px',
        '14': '14px',
        '16': '16px',
      }
    },
  },
  plugins: [],
}

