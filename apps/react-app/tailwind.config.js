/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
// tailwind.config.js
  theme: {
    extend: {
      fontFamily: {
        Sekuya: ["Sekuya", "sans-serif"],
        font2: ["Bricolage Grotesque","sans-serif"]
      },
    },
  },
 plugins: [require('tailwind-scrollbar-hide')]
}