import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ReactNode } from 'react'

import {
  InitializeSlices,
  RenderModalReloadCoinsConfirmation,
  RenderToasts,
  RenderWSS,
  RequestNotificationPermission,
} from '@/components/shared'

import '@/styles/globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
  style: ['italic', 'normal'],
  fallback: ['arial'],
})

export const metadata: Metadata = {
  title: 'ReloadClub: Beta',
  description: 'Algo novo está surgindo. Reload.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} bg-gray-1200 font-poppins font-normal`}
      >
        <InitializeSlices>{children}</InitializeSlices>

        <RenderWSS />
        <RenderToasts />

        <RenderModalReloadCoinsConfirmation />

        <RequestNotificationPermission />

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
