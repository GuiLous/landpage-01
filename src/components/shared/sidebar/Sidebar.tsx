'use client'

import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

import { useAppSelector } from '@/store'

import { SidebarAvatarLink } from './SidebarAvatarLink'
import { SidebarFooter } from './SidebarFooter'
import { SidebarLobbyButton } from './SidebarLobbyButton'
import { SidebarLogo } from './SidebarLogo'
import { SidebarMenuItemList } from './SidebarMenuItemList'

export function Sidebar() {
  const { user } = useAppSelector((state) => state.user)

  const pathname = usePathname()

  const showInviteBar =
    pathname === '/jogar' &&
    user?.invites_available_count &&
    user.invites_available_count > 0 &&
    process.env.NEXT_PUBLIC_USE_INVITES

  return (
    <aside
      className={twMerge(
        'fixed z-30 h-full w-[300px] select-none',
        '3xl:w-[250px]'
      )}
      style={{ height: `calc(100% - ${showInviteBar ? 48 : 0}px)` }}
    >
      <main
        className={twMerge(
          'relative h-full flex-col justify-between gap-[4.875rem] overflow-hidden bg-gray-1100',
          '3xl:gap-[3.625rem]'
        )}
      >
        <SidebarLogo />

        <section className={twMerge('flex-col gap-10', '3xl:gap-9')}>
          <SidebarAvatarLink />

          <SidebarLobbyButton />

          <SidebarMenuItemList />
        </section>

        <SidebarFooter />
      </main>
    </aside>
  )
}
