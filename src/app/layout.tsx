import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ReactNode } from 'react'

import '@/styles/globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
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
    <html lang="en">
      <body
        className={`${poppins.variable} bg-gray-1200 font-poppins font-normal`}
      >
       oi
      </body>
    </html>
  )
}
