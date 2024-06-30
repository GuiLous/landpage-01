import { Theme } from '@radix-ui/themes'
import type { Metadata } from 'next'
import { Montserrat, Nunito_Sans, Poppins } from 'next/font/google'
import { ReactNode } from 'react'

import '@radix-ui/themes/styles.css'

import '@/styles/globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['700'],
  style: ['normal'],
  fallback: ['arial'],
  preload: true,
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['700'],
  style: ['normal'],
  fallback: ['arial'],
  preload: true,
})

const nunito = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  fallback: ['arial'],
  preload: true,
})

export const metadata: Metadata = {
  title: '',
  description: '',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Theme>
          <div
            className={`${poppins.variable} ${montserrat.variable} ${nunito.variable} font-nunito h-full bg-zinc-900 py-10 font-normal text-white`}
          >
            {children}
          </div>
        </Theme>
      </body>
    </html>
  )
}
