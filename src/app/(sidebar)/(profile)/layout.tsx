import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <main className={twMerge('h-screen flex-col pb-10', '3xl:pb-[1.875rem]')}>
      <section className="relative flex-col">{children}</section>
    </main>
  )
}
