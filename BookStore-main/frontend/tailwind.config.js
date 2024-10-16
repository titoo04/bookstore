/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./src/Components/**/*.{js,jsx,ts,tsx}" ,
    "./index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'),],
}

