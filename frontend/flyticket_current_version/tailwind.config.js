/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,tsx}',
  ],
  theme: {
    extend: {
      height: {
        '50': '50px',
        '70': '70px',
        '90': '90px',
        '175': '175px',
        '200': '200px',
        '215': '215px',
        '225': '225px',
        '250': '250px',
        '300': '300px',
        '350': '350px',
        '400': '400px',
        '450': '450px',
        '500': '500px',
        '550': '550px'
      },
      width: {
        '50': '50px',
        '70': '70px',
        '90': '90px',
        '175': '175px',
        '200': '200px',
        '215': '215px',
        '225': '225px',
        '250': '250px',
        '300': '300px',
        '350': '350px',
        '400': '400px',
        '450': '450px',
        '500': '500px',
        '550': '550px',
        '600': '600px',
        '700': '700px'
      },
      margin: {
        '50': '50px',
      },
      borderRadius: {
        '12': '12px',
        '14': '14px',
        '16': '16px',
      },
      colors: {
        customGray: '#eff1f4',
        customBlue: '#2C3E50',
      },
      keyframes: {
        slideInFromRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOutToRight: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        slideInFromRight: 'slideInFromRight 0.3s ease-out forwards',
        slideOutToRight: 'slideOutToRight 0.3s ease-out forwards',
        fadeIn: 'fadeIn 0.3s ease-out', // Длительность и плавность анимации
      },
    },
  },
  plugins: [],
}

