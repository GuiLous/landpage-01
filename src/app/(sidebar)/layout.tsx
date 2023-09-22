import { Sidebar } from '@/components/shared'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative">
      <Sidebar />

      <section className="ml-[300px] 3xl:ml-[250px]">{children}</section>
    </main>
  )
}
