import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    '!node_modules/**/*',
    '!**/.next/**/*',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: 'var(--font-poppins)',
        montserrat: 'var(--font-montserrat)',
        nunito: 'var(--font-nunito)',
      },
      backgroundImage: {
        home_bg: "url('/images/img_02.jpg')",
        gradient_purple:
          'linear-gradient(180deg, rgba(84, 84, 212, 0.27) 0%, rgba(84, 84, 212, 0.1134) 100%)',
        gradient_red:
          'linear-gradient(180deg, rgba(251, 168, 28, 0.1066) 0%, rgba(224, 86, 136, 0.0615) 100%)',
      },
      keyframes: {
        fade_in_up: {
          '0%': { opacity: '0', transform: 'translateY(100px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounce_hand: {
          '0%': { transform: 'translateY(-25%) rotate(180deg)' },
          '100%': {
            transform: 'translateY(-25%) rotate(180deg)',
            animation_timing_function: 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': {
            transform: 'rotate(180deg)',
            animation_timing_function: 'cubic-bezier(0,0,0.2,1)',
          },
        },
      },
      animation: {
        fade_in_up: 'fade_in_up 1s ease-out forwards',
        bounce_hand: 'bounce_hand 1s infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
export default config
