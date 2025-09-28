/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Optional: Add a custom font if you want
        // sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};