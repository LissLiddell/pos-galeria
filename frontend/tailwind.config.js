/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5b69bc',
        secondary: '#67748e',
        success: '#50cd89',
        danger: '#f47a7a'
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}