import Image from 'next/image'

import heroMobileImg from '@/assets/images/home_mobile_hero.png'

export function HeroMobileImage() {
  return (
    <div className="flex-initial items-start justify-center">
      <Image
        src={heroMobileImg}
        priority={true}
        alt="Personagem do GTA 5"
        className="max-w-[81%] range-md-xl:max-w-[28%]"
      />
    </div>
  )
}
