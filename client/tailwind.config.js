/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#48C4A4',
          'teal-dark': '#2D9B7F',
          'teal-darker': '#1A6B57',
          amber: '#F59E0B',
          'amber-light': '#FCD34D',
        },
        dark: '#121212',
        'dark-card': '#1E1E1E',
        'dark-border': '#2A2A2A',
        cream: '#F8F6F0',
        'cream-warm': '#F5F0E8',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}