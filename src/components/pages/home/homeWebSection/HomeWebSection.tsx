import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import liquidBg from '@/assets/images/home_bg_animated.gif'
import hero from '@/assets/images/home_hero.png'
import logo from '@/assets/images/logo_type_white.svg'

import { HomeFakeSignIn } from '../HomeFakeSignIn'
import { HomeVideoButton } from '../HomeVideoButton'
import { HomeWebSectionMessage } from './HomeWebSectionMessage'
import { HomeWebSectionSteamButton } from './HomeWebSectionSteamButton'

export function HomeWebSection() {
  return (
    <section
      className={twMerge('gap-16 bg-home bg-no-repeat bg-cover', 'xl:hidden')}
    >
      <div className="relative mt-[3%] min-w-[58%] items-center justify-end">
        <Image
          src={liquidBg}
          alt="Animated Gif"
          width={700}
          sizes="100vw"
          className="mt-3 h-fit w-[64%]"
        />

        <Image
          src={hero}
          alt="GTA V personagem"
          className="absolute bottom-0 right-10 w-3/4"
          sizes="100vw"
          priority
        />
      </div>

      <div className="flex-col items-start justify-center gap-8">
        <Image src={logo} alt="Reload" width={305} />

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
