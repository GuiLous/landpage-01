import { Section01 } from '@/components/pages/home/components/section-01'
import { Section02 } from '@/components/pages/home/components/section-02'
import { Section03 } from '@/components/pages/home/components/section-03'
import { Section04 } from '@/components/pages/home/components/section-04/section-04'
import { Section05 } from '@/components/pages/home/components/section-05'

import { Footer } from '@/components/shared/footer'
import { Header } from '@/components/shared/header'

export default function Home() {
  return (
    <main className="flex h-full w-full flex-col gap-28 overflow-hidden">
      <Header />

      <Section01 />

      <Section02 />

      <Section03 />

      <Section04 />

      <Section05 />

      <Footer />
    </main>
  )
}
