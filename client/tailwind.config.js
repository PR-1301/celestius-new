/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        celestius: {
          black: '#000000',
          dark: '#08080a',
          surface: '#111115',
          gold: '#FFCC00',
          'gold-light': '#FFE066',
          'gold-dark': '#C69E00',
          'gold-glow': 'rgba(255, 204, 0, 0.15)',
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'subtle-float': 'subtleFloat 6s ease-in-out infinite',
        'forge-spark': 'forgeSpark 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'spin-slow': 'spinSlow 25s linear infinite',
        'spin-reverse-slow': 'spinReverseSlow 25s linear infinite',
        'spin-medium': 'spinSlow 15s linear infinite',
        'spin-reverse-medium': 'spinReverseSlow 15s linear infinite',
        'scan-line': 'scanLine 4s ease-in-out infinite',
        'pulse-ring': 'pulseRing 4s cubic-bezier(0.215, 0.610, 0.355, 1) infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: 0.2, transform: 'scale(1)' },
          '50%': { opacity: 0.5, transform: 'scale(1.08)' },
        },
        subtleFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        forgeSpark: {
          '0%, 100%': { opacity: 0.2, width: '30%' },
          '50%': { opacity: 0.8, width: '70%' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        spinReverseSlow: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        scanLine: {
          '0%, 100%': { transform: 'translateY(-20%)', opacity: 0.3 },
          '50%': { transform: 'translateY(120%)', opacity: 0.8 },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.95)', opacity: 0.8 },
          '50%': { opacity: 0.5 },
          '100%': { transform: 'scale(1.35)', opacity: 0 },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        }
      }
    },
  },
  plugins: [],
}
