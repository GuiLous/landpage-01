import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import heroMobileImg from '@/assets/images/home_mobile_hero.png'

export function HomeMobileSectionHero() {
  return (
    <Image
      src={heroMobileImg}
      priority={true}
      alt="Personagem do GTA 5"
      className={twMerge('max-w-full', 'range-md-xl:max-w-[28%]')}
    />
  )
}
