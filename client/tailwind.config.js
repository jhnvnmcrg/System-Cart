/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0f4ff',
          100: '#e0eaff',
          200: '#c7d7fe',
          300: '#a5b8fc',
          400: '#8193f8',
          500: '#6270f1',
          600: '#4f52e5',
          700: '#4040ca',
          800: '#3636a3',
          900: '#313181',
          950: '#1e1d4c',
        },
        surface: {
          50:  '#f8f9fc',
          100: '#f0f2f8',
          200: '#e2e6f0',
          800: '#1a1d2e',
          900: '#11131f',
          950: '#080a12',
        },
      },
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Cabinet Grotesk', 'Sora', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(98, 112, 241, 0.3)',
        'glow-lg': '0 0 40px rgba(98, 112, 241, 0.25)',
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.4s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
