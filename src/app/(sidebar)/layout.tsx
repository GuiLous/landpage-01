import { ReactNode } from 'react'

import { RenderInviteBar, Wrapper } from '@/components/pages'

import { Sidebar } from '@/components/shared'

export default function SidebarLayout({ children }: { children: ReactNode }) {
  return (
    <main className="h-screen flex-col">
      <RenderInviteBar />

      <main className="h-screen bg-gray-1200">
        <Sidebar />

        <Wrapper>{children}</Wrapper>
      </main>
    </main>
  )
}
