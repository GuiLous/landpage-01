import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ReactNode } from 'react'

import { Providers } from '@/providers'

import { InitializeSlices, RenderToasts, RenderWSS } from '@/components/shared'

import '@/styles/globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'ReloadClub: Beta',
  description: 'Algo novo está surgindo. Reload.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={`${poppins.variable} bg-gray-1200 font-poppins font-normal`}
        >
          <InitializeSlices>{children}</InitializeSlices>

          <RenderWSS />
          <RenderToasts />
        </body>
      </html>
    </Providers>
  )
}
