/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {

      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },

      color:{
        "dark-purple":"#081A51",
        "light-white":"rgba(255,255,255,0.17)",
      },
      
      animation: {
        'fade-in-out': 'fadeInOut 2s ease-in-out infinite',
      },
      keyframes: {
        fadeInOut: {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 },
        },
      },
  },
  },
  plugins: [],
}

