import { ReactNode } from 'react'

import { Sidebar } from '@/components/shared'

export default function layout({ children }: { children: ReactNode }) {
  return (
    <main className="h-screen bg-gray-1200">
      <Sidebar />

      <section className="ml-[300px] select-none px-[3.4%] py-10 3xl:ml-[250px] 3xl:px-[1.6%] 3xl:py-8">
        {children}
      </section>
    </main>
  )
}
