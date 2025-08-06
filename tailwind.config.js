/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff8ff',
          100: '#daefff',
          200: '#bee3ff',
          300: '#93d5ff',
          400: '#4FBCFF',
          500: '#4FBCFF',
          600: '#3b9ddb',
          700: '#2a7eb8',
          800: '#1e5f95',
          900: '#0c1020',
        },
        midnight: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0c1020',
        },
        surface: '#1a1f35',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}