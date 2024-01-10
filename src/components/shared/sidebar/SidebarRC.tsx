import Image from 'next/image'

import { useUserStore } from '@/store/userStore'

import reloadCredits from '@/assets/images/reload_credits.png'

import SidebarRCButton from './SidebarRCButton'

export function SidebarRC() {
  const user = useUserStore.getState().user

  return (
    <section className="items-center justify-between overflow-hidden rounded border border-purple-400 bg-purple-400/15 pl-3">
      <div className="items-center gap-3">
        <Image
          width={20}
          height={20}
          src={reloadCredits}
          alt="Reload Credits"
        />

        <span className="text-sm font-medium leading-none text-white">
          {user?.account?.coins}
        </span>
      </div>

      <SidebarRCButton />
    </section>
  )
}
