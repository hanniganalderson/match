/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent-blue': '#1E3A8A',
        'accent-purple': '#7C3AED',
        'background': '#1F2937',
        'content-primary': '#F1F5F9',
        'content-secondary': '#9CA3AF',
      },
    },
  },
  plugins: [],
};