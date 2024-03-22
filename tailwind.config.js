/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "mainBackgroundColor": '#b4b3b3',
        "columnBackgroundColor": 'whitesmoke'
      }
    },
  },
  plugins: [],
}

