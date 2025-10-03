/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./auth/**/*.html",
    "./post/**/*.html",
    "./profile/**/*.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-blue': '#60a5fa',
        'primary-blue-hover': '#3b82f6',
        'primary-blue-light': '#1e40af',
        'secondary-blue': '#2563eb',
        'accent-blue': '#60a5fa',
        'neutral': {
          50: '#0a0a0a',
          100: '#171717',
          200: '#262626',
          300: '#404040',
          400: '#525252',
          500: '#737373',
          600: '#a3a3a3',
          700: '#d4d4d4',
          800: '#e5e5e5',
          900: '#f5f5f5',
        }
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(255 255 255 / 0.05)',
        'md': '0 4px 6px -1px rgb(255 255 255 / 0.1), 0 2px 4px -2px rgb(255 255 255 / 0.05)',
        'lg': '0 10px 15px -3px rgb(255 255 255 / 0.1), 0 4px 6px -4px rgb(255 255 255 / 0.05)',
      },
      borderRadius: {
        'sm': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
      }
    },
  },
  plugins: [],
}