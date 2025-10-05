/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'flow-cream': '#F5F2EA',
        'flow-dark-cream': '#E8E2D5',
        'flow-light-cream': '#FAF8F3',
        'flow-orange': '#FE5700',
        'flow-dark-orange': '#E54E00',
        'flow-text-primary': '#1A1A1A',
        'flow-text-secondary': '#4A4A4A',
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'jakarta': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float-orb': 'floatOrb 50s ease-in-out infinite',
        'float-orb-delayed': 'floatOrb 50s ease-in-out infinite 15s',
        'float-orb-delayed-2': 'floatOrb 50s ease-in-out infinite 30s',
        'fade-in-up': 'fadeInUp 0.9s ease-out',
        'pulse-ring': 'pulseRing 3.5s ease-in-out infinite',
        'bounce-arrow': 'bounceArrow 2.5s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 45s linear infinite',
        'badge-pulse': 'badgePulse 3.5s ease-in-out infinite',
      },
      keyframes: {
        floatOrb: {
          '0%, 100%': { 
            transform: 'translate(0, 0) scale(1)', 
            opacity: '0.6' 
          },
          '33%': { 
            transform: 'translate(100px, -100px) scale(1.25)', 
            opacity: '0.8' 
          },
          '66%': { 
            transform: 'translate(-80px, 80px) scale(0.8)', 
            opacity: '0.7' 
          },
        },
        fadeInUp: {
          from: { 
            opacity: '0', 
            transform: 'translateY(50px)' 
          },
          to: { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
        pulseRing: {
          '0%, 100%': { 
            transform: 'scale(1)',
            boxShadow: '0 16px 40px rgba(254, 87, 0, 0.5), 0 0 0 0 rgba(254, 87, 0, 0.5)'
          },
          '50%': { 
            transform: 'scale(1.05)',
            boxShadow: '0 16px 40px rgba(254, 87, 0, 0.5), 0 0 0 24px rgba(254, 87, 0, 0)'
          },
        },
        bounceArrow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
        rotateSlow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        badgePulse: {
          '0%, 100%': { 
            transform: 'scale(1)',
            boxShadow: '0 10px 30px rgba(254, 87, 0, 0.5), 0 0 0 0 rgba(254, 87, 0, 0.4)'
          },
          '50%': { 
            transform: 'scale(1.05)',
            boxShadow: '0 10px 30px rgba(254, 87, 0, 0.5), 0 0 0 16px rgba(254, 87, 0, 0)'
          },
        },
      },
    },
  },
  plugins: [],
};