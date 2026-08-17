/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        dark: {
          900: '#070710',
          800: '#0a0a14',
          700: '#0e0e1a',
          600: '#111120',
          500: '#161626',
        },
        accent: {
          cyan: '#00d4ff',
          teal: '#0be0c0',
          blue: '#3b82f6',
        },
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite alternate',
        'ring-pulse': 'ringPulse 3s ease-in-out infinite',
        'skill-grow': 'skillGrow 1.2s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'typing': 'typing 1.2s ease-in-out infinite',
        'explore-float': 'exploreFloat 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%': { boxShadow: '0 0 30px rgba(6,182,212,0.4), 0 0 60px rgba(59,130,246,0.2)' },
          '100%': { boxShadow: '0 0 50px rgba(6,182,212,0.7), 0 0 100px rgba(59,130,246,0.35)' },
        },
        ringPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        skillGrow: {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        typing: {
          '0%, 60%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '30%': { transform: 'translateY(-6px)', opacity: '1' },
        },
        exploreFloat: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.6' },
          '50%': { transform: 'translateY(6px)', opacity: '1' },
        },
      },
      backgroundImage: {
        'orb-gradient': 'radial-gradient(circle at 35% 35%, #06b6d4, #3b82f6 50%, #1e1b4b)',
        'bar-gradient': 'linear-gradient(90deg, #0be0c0, #00d4ff)',
      },
    },
  },
  plugins: [],
}
