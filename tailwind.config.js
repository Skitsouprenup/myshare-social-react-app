/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      screens: {
        'max-xs': {'max': '400px'},
      },

      padding: {
        '2px': 'padding: 2px'
      },

      keyframes: {
        /*We use negative value in order to
          start the translation from the left
          side of the screen
        */
        'slide-in': {
          '0%': {
            '-webkit-transform': 'translateX(-100%)',
            transform: 'translateX(-100%)',
          },
          '100%': {
            '-webkit-transform': 'translateX(0px)',
            transform: 'translateX(0px)',
          },
        },
      },

      animation: {
        'slide-in': 'slide-in 0.25s linear',
      },

    },
  },
  plugins: [],
}