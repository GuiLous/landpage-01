import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

const heroMobileImg = '/assets/images/home_mobile_hero.png'

export function HomeMobileSectionHero() {
  return (
    <Image
      src={heroMobileImg}
      priority={true}
      width={338}
      height={370}
      alt="Personagem do GTA 5"
      className={twMerge('max-w-full', 'range-md-xl:max-w-[28%]')}
    />
  )
}
