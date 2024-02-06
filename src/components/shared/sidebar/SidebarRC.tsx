'use client'

import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import { useUserStore } from '@/store/userStore'

import SidebarRCButton from './SidebarRCButton'

const reloadCredits = '/assets/images/reload_credits.png'

export function SidebarRC() {
  const { user } = useUserStore()

  return (
    <section className="items-center justify-between overflow-hidden rounded border-none bg-purple-400/15 pl-3 outline outline-1 outline-purple-400">
      <div className="items-center gap-3">
        <div
          className={twMerge(
            'relative h-5 w-5 flex-initial',
            'ultrawide:w-10 ultrawide:h-10'
          )}
        >
          <Image fill quality={40} src={reloadCredits} alt="Reload Credits" />
        </div>

        <span
          className={twMerge(
            'text-sm font-medium text-white',
            'leading-none',
            'ultrawide:text-2xl ultrawide:leading-none'
          )}
        >
          {user?.account?.coins}
        </span>
      </div>

      <SidebarRCButton />
    </section>
  )
}
