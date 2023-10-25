import { twMerge } from 'tailwind-merge'

import { SidebarAvatarLink } from './SidebarAvatarLink'
import { SidebarFooter } from './SidebarFooter'
import { SidebarLobbyButton } from './SidebarLobbyButton'
import { SidebarLogo } from './SidebarLogo'
import { SidebarMenuItemList } from './SidebarMenuItemList'

export function Sidebar() {
  return (
    <aside
      className={twMerge(
        'fixed z-30 h-full w-[300px] select-none',
        '3xl:w-[250px]'
      )}
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
