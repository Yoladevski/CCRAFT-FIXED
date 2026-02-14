/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0E0E0E',
        'bg-secondary': '#1A1A1A',
        'accent-red': '#B11226',
        'steel-grey': '#2E2E2E',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A0A0A0',
      },
      fontFamily: {
        heading: ['Progress', 'sans-serif'],
        body: ['KGRedHands', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
