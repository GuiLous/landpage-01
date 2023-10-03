import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        '3xl': { max: '1600px' },
        '2xl': { max: '1536px' },
        xl: { max: '1279px' },
        lg: { max: '1023px' },
        md: { max: '767px' },
        sm: { max: '639px' },
        'range-md-xl': { min: '913px', max: '1279px' },
      },
      colors: {
        purple: {
          300: '#9882FF',
          400: '#6847FF',
          500: '#34218C',
          600: '#3d336d',
          700: '#1A1240',
        },
        gray: {
          100: '#c8c5c5',
          200: '#B7B7B7',
          300: '#999999',
          400: '#444444',
          500: '#434343',
          600: '#3d3d3d',
          700: '#333333',
          800: '#282828',
          900: '#222222',
          1000: '#1E1E1E',
          1100: '#1B1B1B',
          1200: '#111111',
        },
        cyan: {
          400: '#00E4C9',
          500: '#00A1A1',
        },
        green: {
          400: '#6BE400',
          500: '#2BD641',
          600: '#26BD39',
        },
        yellow: {
          400: '#FFD426',
          500: '#E4BC00',
        },
        red: {
          400: '#FF4242',
          500: '#F63535',
          600: '#8d1919',
        },
        salmon: {
          500: '#F0A87B',
        },
      },
      fontFamily: {
        poppins: 'var(--font-poppins)',
      },
      backgroundImage: {
        home: "url('~/src/assets/images/home_bg.png')",
        home_mobile:
          "url('~/src/assets/images/home_mobile_bg_top.png'), url('~/src/assets/images/home_mobile_bg_bottom.png')",
        sign_up_bottom_left:
          "linear-gradient(201deg, #000 0%, rgba(0, 0, 0, 0) 100%), url('~/src/assets/images/signup_bg_bottom_left.png')",
        not_found: "url('~/src/assets/images/bg_404.png')",
        maintenance: "url('~/src/assets/images/bg_maintenance.png')",
      },
      animation: {
        fade: 'fade 0.2s ease-in-out',
        shake: 'shake 3.5s ease infinite',
        // Tooltip
        'slide-up-fade': 'slide-up-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-right-fade':
          'slide-right-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down-fade': 'slide-down-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-left-fade': 'slide-left-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shake: {
          '0%, 20%, 40%': {
            transform: 'rotate(0)',
          },
          '1.5%, 21.5%, 41.5%': {
            transform: 'rotate(-13deg) scale(1.2)',
          },
          '2.5%, 22.5%, 42.5%': {
            transform: 'rotate(13deg) scale(1.2)',
          },
          '4%, 24%, 44%': {
            transform: 'rotate(-13deg) scale(1.2)',
          },
          '5%, 25%, 45%': {
            transform: 'rotate(13deg) scale(1.2)',
          },
          '6.5%, 26.5%, 46.5%': {
            transform: 'rotate(-13deg) scale(1.2)',
          },
          '7.5%, 27.5%, 47.5%': {
            transform: 'rotate(0deg) scale(1)',
          },
          '100%': {
            transform: 'rotate(0)',
          },
        },
        // Tooltip
        'slide-up-fade': {
          '0%': { opacity: '0', transform: 'translateY(2px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-right-fade': {
          '0%': { opacity: '0', transform: 'translateX(-2px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-down-fade': {
          '0%': { opacity: '0', transform: 'translateY(-2px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-left-fade': {
          '0%': { opacity: '0', transform: 'translateX(2px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        // Modal
        'dialog-overlay-show': {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        'dialog-overlay-hide': {
          from: {
            opacity: '1',
          },
          to: {
            opacity: '0',
          },
        },
        'dialog-content-show': {
          from: {
            opacity: '0',
            transform: 'translate(-50%, -50%) scale(0.95)',
          },
          to: {
            opacity: '1',
            transform: 'translate(-50%, -50%) scale(1)',
          },
        },
        'dialog-content-hide': {
          from: {
            opacity: '1',
            transform: 'translate(-50%, -50%) scale(1)',
          },
          to: {
            opacity: '0',
            transform: 'translate(-50%, -50%) scale(0.95)',
          },
        },
        // Drawer
        'drawer-content-show': {
          from: {
            opacity: '0',
            transform: 'translate(50%, 0%)',
          },
          to: {
            opacity: '1',
            transform: 'translate(0%, 0%)',
          },
        },
        'drawer-content-hide': {
          from: {
            opacity: '1',
            transform: 'translate(0%, 0%)',
          },
          to: {
            opacity: '0',
            transform: 'translate(50%, 0%)',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-radix')],
}
export default config
