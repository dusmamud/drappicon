/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd',
          400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9',
          800: '#5b21b6', 900: '#4c1d95', 950: '#2e1065',
        },
        night: {
          600: '#26262e', 700: '#1c1c22', 800: '#141419',
          850: '#101014', 900: '#0b0b0f', 950: '#08080b',
        },
        ink: '#0f172a',
        brandviolet: '#8b5cf6',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
      boxShadow: {
        soft: '0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)',
        card: '0 1px 2px rgb(15 23 42 / 0.05), 0 10px 30px -12px rgb(15 23 42 / 0.15)',
        pop: '0 12px 32px -8px rgb(15 23 42 / 0.25)',
        pillwarm: '0 10px 25px -6px rgb(249 115 22 / 0.55)',
      },
    },
  },
  plugins: [],
}
