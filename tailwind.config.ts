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
    extend: {}
  },
  plugins: [require('@tailwindcss/forms')],
}
export default config
