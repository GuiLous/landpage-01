import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ReactNode } from 'react'

import { Providers } from '@/providers/Providers'

import { PrivateRoute, RenderWSS } from '@/components/shared'
import '@/styles/globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
  fallback: ['arial'],
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
          className={`${poppins.variable} bg-black/90 font-poppins font-normal`}
        >
          <PrivateRoute>{children}</PrivateRoute>
          <RenderWSS />
        </body>
      </html>
    </Providers>
  )
}
