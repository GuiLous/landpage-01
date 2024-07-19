import { Section01 } from '@/components/pages/home/components/section-01'
import { Section03 } from '@/components/pages/home/components/section-03'
import { Section04 } from '@/components/pages/home/components/section-04'
import { Section05 } from '@/components/pages/home/components/section-05'

import { FadeInUpComponent } from '@/components/shared/fade-in-view'
import { Footer } from '@/components/shared/footer'
import { Header } from '@/components/shared/header'

export default function Home() {
  return (
    <main className="flex h-full w-full flex-col gap-28 overflow-hidden">
      <Header />

      <FadeInUpComponent>
        <Section01 />
      </FadeInUpComponent>

      {/* <FadeInUpComponent>
        <Section02 />
      </FadeInUpComponent> */}

      <FadeInUpComponent>
        <Section03 />
      </FadeInUpComponent>

      <FadeInUpComponent>
        <Section04 />
      </FadeInUpComponent>

      <FadeInUpComponent>
        <Section05 />
      </FadeInUpComponent>

      <Footer />
    </main>
  )
}
