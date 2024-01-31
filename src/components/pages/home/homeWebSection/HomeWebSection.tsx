import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import { HomeFakeSignIn } from '../HomeFakeSignIn'
import { HomeVideoButton } from '../HomeVideoButton'
import { HomeWebSectionMessage } from './HomeWebSectionMessage'
import { HomeWebSectionSteamButton } from './HomeWebSectionSteamButton'

const liquidBg = '/assets/images/home_bg_animated.gif'
const hero = '/assets/images/home_hero.png'
const logo = '/assets/images/logo_type_white.svg'

export function HomeWebSection() {
  return (
    <section className={twMerge('gap-16 bg-home', 'xl:hidden')}>
      <div className="relative mt-[3%] min-w-[58%] items-center justify-end">
        <Image
          src={liquidBg}
          alt="Animated Gif"
          width={700}
          height={528}
          priority
          className="mt-3 h-fit w-[64%]"
          quality={40}
        />

        <Image
          src={hero}
          alt="GTA V personagem"
          className="absolute bottom-0 right-10 w-3/4"
          width={835}
          height={690}
          sizes="100vw"
          priority
        />
      </div>

      <div className="flex-col items-start justify-center gap-8">
        <Image src={logo} alt="Reload" width={305} height={45} priority />

        <HomeWebSectionMessage />

        <div className="max-w-[452px] flex-initial items-center justify-center gap-4">
          <HomeWebSectionSteamButton />

          <HomeVideoButton />
        </div>

        <HomeFakeSignIn />
      </div>
    </section>
  )
}
