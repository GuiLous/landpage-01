import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import gta_avatar from '@/assets/images/gta_avatar.png'

export function ConnectAvatarImage() {
  return (
    <section className={twMerge('h-full items-end', '3xl:h-[85%]')}>
      <div className="h-[90%] items-end">
        <Image
          src={gta_avatar}
          alt="Personagem do GTA V"
          className="max-h-full w-auto"
        />
      </div>
    </section>
  )
}
