import { Theme } from '@radix-ui/themes'
import type { Metadata } from 'next'
import { Montserrat, Nunito_Sans, Poppins } from 'next/font/google'
import { ReactNode } from 'react'

import '@/styles/globals.css'
import '@radix-ui/themes/styles.css'

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['700'],
  style: ['normal'],
  fallback: ['arial'],
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['700'],
  style: ['normal'],
  fallback: ['arial'],
})

const nunito = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  fallback: ['arial'],
})

export const metadata: Metadata = {
  title: '',
  description: '',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppins.variable} ${montserrat.variable} ${nunito.variable} h-full bg-zinc-900`}
      >
        <Theme className="bg-zinc-900 py-10 font-nunito font-normal text-white">
          {children}
        </Theme>
      </body>
    </html>
  )
}
