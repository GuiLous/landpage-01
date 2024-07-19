import type { Metadata } from 'next'
import { Montserrat, Nunito_Sans, Poppins } from 'next/font/google'
import { ReactNode } from 'react'

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
  title: 'Empreendedor Imbatível',
  description:
    'Aprenda manter e cultivar uma mentalidade de sucesso como empreendedor',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppins.variable} ${montserrat.variable} ${nunito.variable} h-screen bg-zinc-900 font-nunito font-normal text-white`}
      >
        <div className="py-10">{children}</div>
      </body>
    </html>
  )
}
