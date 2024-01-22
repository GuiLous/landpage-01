import { ReactNode } from 'react'

import { profileSteps } from '@/utils'

import { Wizard } from '@/components/shared'

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <main className="h-screen flex-col">
      <Wizard steps={profileSteps} page="profile" />

      <section className="relative flex-col">{children}</section>
    </main>
  )
}
