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
      },
      animation: {
        fade: 'fade 0.2s ease-in-out',
      },
      keyframes: {
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
export default config
