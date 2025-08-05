/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: [
    // Animation classes
    'animate-float',
    'animate-float-delayed',
    'animate-float-slow',
    'animate-spin-slow',
    'animate-bounce-slow',
    'animate-fade-in-up',
    'animation-delay-200',
    'animation-delay-400',
    // Backdrop blur
    'backdrop-blur-xl',
    // Complex gradient patterns
    'bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.1)_1px,transparent_1px)]',
    'bg-[length:50px_50px]',
    // Complex colors with opacity
    'from-blue-400/20',
    'to-purple-600/20',
    'from-purple-400/20',
    'to-pink-600/20',
    'from-cyan-400/10',
    'to-blue-600/10',
    'from-blue-400/20',
    'to-transparent',
    'bg-purple-400/30',
    'border-white/10',
    'border-white/20',
    'bg-white/10',
    'bg-white/20',
    'text-white/50',
    'text-white/60',
    'text-white/70',
    'text-blue-200/70',
    'text-blue-200/80',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 8s ease-in-out infinite',
        'float-slow': 'float-slow 10s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(10deg)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(-5deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(5deg)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-in-up': {
          from: {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#3b82f6',
          secondary: '#6366f1',
          accent: '#f59e0b',
          neutral: '#374151',
          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#f3f4f6',
          info: '#06b6d4',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
        },
      },
      'dark',
    ],
    base: true,
    styled: true,
    utils: true,
  },
}
