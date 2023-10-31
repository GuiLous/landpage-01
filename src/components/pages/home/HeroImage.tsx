import Image from 'next/image'

import heroImg from '@/assets/images/home_hero.png'

export function HeroImage() {
  return (
    <div className="relative z-10 mr-[1.6%] mt-auto items-center justify-end">
      <Image
        src={heroImg}
        priority={true}
        alt="Personagem do GTA 5"
        className="w-[74.6%]"
      />
    </div>
  )
}
