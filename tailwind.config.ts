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
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-radix')],
}
export default config
