import { ReactNode } from 'react'

import { ProfileWizard } from '@/components/pages'

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <main className="h-screen flex-col">
      <ProfileWizard />

      <section className="relative flex-col">{children}</section>
    </main>
  )
}
