import { ReactNode } from 'react'

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <main className="h-screen flex-col">
      <section className="relative flex-col">{children}</section>
    </main>
  )
}
