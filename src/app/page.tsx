import {
  AnimatedBg,
  Brand,
  FakeSignIn,
  HeroImage,
  HeroMobileImage,
  MobileHeader,
} from '@/components/pages'

import { Footer } from '@/components/shared'

export default function Home() {
  return (
    <>
      <main className="relative h-screen select-none flex-col items-center justify-center bg-black bg-home bg-cover bg-no-repeat xl:bg-home_mobile xl:bg-contain xl:bg-[position:top_right,_bottom_left]">
        <section className="items-center xl:hidden">
          <AnimatedBg />

          <HeroImage />

          <section className="relative z-10 max-w-[37.3%] flex-col justify-center gap-6 pl-[3.6%] 3xl:gap-5">
            <Brand />

            <FakeSignIn />
          </section>
        </section>

        <section className="hidden flex-col items-center xl:flex xl:px-7">
          <MobileHeader />

          <HeroMobileImage />

          <Brand />
        </section>

        <div className="flex-initial xl:hidden">
          <Footer />
        </div>
      </main>

      <div className="hidden flex-initial xl:flex">
        <Footer />
      </div>
    </>
  )
}
