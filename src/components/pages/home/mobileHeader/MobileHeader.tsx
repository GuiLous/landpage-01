import Image from 'next/image'

import arrow from '@/assets/images/arrow.png'
import joinUsGraphic from '@/assets/images/join_us_graphic.png'

export function MobileHeader() {
  return (
    <header className="min-h-[3.5rem] flex-initial items-center">
      <div className="flex-[1.8_1] justify-center">
        <span className="text-xs">MADE FOR GAMERS</span>
      </div>

      <div className="justify-center">
        <Image src={arrow} alt="arrow" className="max-w-[30px]" />
      </div>

      <div className="justify-center">
        <span className="text-xs">JOIN US</span>
      </div>

      <div className="justify-center">
        <Image src={joinUsGraphic} alt="join us" />
      </div>
    </header>
  )
}
