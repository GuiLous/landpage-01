import { SIDEBAR_BOTTOM_MENU_ITEMS, SIDEBAR_TOP_MENU_ITEMS } from '@/constants'

import { SidebarAvatarLink } from './SidebarAvatarLink'
import { SidebarFooter } from './SidebarFooter'
import { SidebarLobbyButton } from './SidebarLobbyButton'
import { SidebarLogo } from './SidebarLogo'
import { SidebarMenuItem } from './SidebarMenuItem'

type ItemMenu =
  | 'amigos'
  | 'notificações'
  | 'ranking'
  | 'loja'
  | 'suporte'
  | 'sair'

export function Sidebar() {
  return (
    <aside className="fixed h-full w-[300px] 3xl:w-[250px]">
      <main className="relative h-full flex-col justify-between gap-[4.875rem] overflow-hidden bg-gray-1100 3xl:gap-[3.625rem]">
        <SidebarLogo />

        <section className="flex-col gap-10 3xl:gap-9">
          <SidebarAvatarLink />

          <SidebarLobbyButton />

          <div className="flex-initial flex-col gap-7 px-7 3xl:gap-6 3xl:px-6">
            <div className="flex-initial flex-col ">
              {SIDEBAR_TOP_MENU_ITEMS.map((item) => (
                <SidebarMenuItem key={item} item={item as ItemMenu} />
              ))}
            </div>

            <div className="flex-initial flex-col">
              {SIDEBAR_BOTTOM_MENU_ITEMS.map((item) => (
                <SidebarMenuItem key={item} item={item as ItemMenu} />
              ))}
            </div>
          </div>
        </section>

        <SidebarFooter />
      </main>
    </aside>
  )
}
