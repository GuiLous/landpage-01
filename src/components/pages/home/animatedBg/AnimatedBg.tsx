import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import animatedBg from '@/assets/images/home_bg_animated.gif'

export function AnimatedBg() {
  return (
    <div className="absolute top-[1.1%] z-0 items-center justify-center">
      <Image
        src={animatedBg}
        alt="Fundo animado"
        className={twMerge('mr-[10.6%] mt-[6.7%] w-[36.5%]', 'xl:mr-0')}
      />
    </div>
  )
}
