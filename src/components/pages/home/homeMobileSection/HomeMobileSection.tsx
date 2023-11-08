import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import logo from '@/assets/images/logo_type_white.svg'

import { HomeVideoButton } from '../HomeVideoButton'
import { HomeMobileSectionDiscordButton } from './HomeMobileSectionDiscordButton'
import { HomeMobileSectionHero } from './HomeMobileSectionHero'
import { HomeMobileSectionMessage } from './HomeMobileSectionMessage'

export function HomeMobileSection() {
  return (
    <section
      className={twMerge(
        'hidden',
        'xl:flex xl:select-none xl:pt-[60px] xl:pb-10 xl:flex-col xl:items-center xl:justify-center xl:bg-home_mobile xl:bg-cover xl:bg-no-repeat'
      )}
    >
      <HomeMobileSectionHero />

      <section className="flex-col items-center gap-10">
        <Image src={logo} alt="Reload" width={250} />
        <HomeMobileSectionMessage />
        <div className="max-w-[80%] flex-col items-center justify-center gap-4">
          <HomeMobileSectionDiscordButton />

          <HomeVideoButton />
        </div>
      </section>
    </section>
  )
}
