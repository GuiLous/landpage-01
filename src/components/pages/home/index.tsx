import { twMerge } from 'tailwind-merge'

import { Section01 } from '@/components/pages/home/components/section-01'
import { Section02 } from '@/components/pages/home/components/section-02'
import { Section03 } from '@/components/pages/home/components/section-03'
import { Section04 } from '@/components/pages/home/components/section-04'
import { Section05 } from '@/components/pages/home/components/section-05'
import { SectionCta } from '@/components/pages/home/components/section-cta'

import { FadeInUpComponent } from '@/components/shared/fade-in-view'
import { Footer } from '@/components/shared/footer'
import { Header } from '@/components/shared/header'
import { VideoPlayer } from '@/components/shared/video-player'

export default function Home() {
  return (
    <main
      className={twMerge(
        'flex h-full w-full flex-col gap-28 overflow-hidden',
        'lg:gap-20'
      )}
    >
      <Header />

      <FadeInUpComponent>
        <Section01 />
      </FadeInUpComponent>

      <FadeInUpComponent>
        <Section02>
          <VideoPlayer />
        </Section02>
      </FadeInUpComponent>

      <FadeInUpComponent>
        <Section03 />
      </FadeInUpComponent>

      <FadeInUpComponent>
        <SectionCta />
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
