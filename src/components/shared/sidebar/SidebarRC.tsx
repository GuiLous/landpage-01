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
        <Image
          width={20}
          height={20}
          src={reloadCredits}
          alt="Reload Credits"
        />

        <span
          className={twMerge('text-sm font-medium text-white', 'leading-none')}
        >
          {user?.account?.coins}
        </span>
      </div>

      <SidebarRCButton />
    </section>
  )
}
