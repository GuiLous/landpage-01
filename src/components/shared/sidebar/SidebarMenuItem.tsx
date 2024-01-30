'use client'

import { useCallback } from 'react'
import { AiFillBell } from 'react-icons/ai'
import { BiSolidMessage } from 'react-icons/bi'
import { BsEnvelopeFill } from 'react-icons/bs'
import { FaUserFriends } from 'react-icons/fa'
import { IoExitOutline } from 'react-icons/io5'
import { MdOutlineBarChart, MdShoppingCart } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'

import { MENU_LINKS, SOON_ITEMS } from '@/constants'

import { useInvitesStore } from '@/store/invitesStore'
import { useNotificationStore } from '@/store/notificationStore'
import { useUserStore } from '@/store/userStore'

import { Badge, Link } from '@/components/shared'

import { SidebarMenuItemIcon } from './SidebarMenuItemIcon'

export type ItemMenu =
  | 'amigos'
  | 'notificações'
  | 'ranking'
  | 'loja'
  | 'suporte'
  | 'sair'

type LinkUrlType = 'loja' | 'ranking'

interface SidebarMenuItemProps {
  item: ItemMenu
  onClickFunction: (item: ItemMenu) => void
}

const icons = {
  amigos: FaUserFriends,
  notificações: AiFillBell,
  ranking: MdOutlineBarChart,
  loja: MdShoppingCart,
  suporte: BiSolidMessage,
  sair: IoExitOutline,
}

export function SidebarMenuItem({
  item,
  onClickFunction,
}: SidebarMenuItemProps) {
  const { user } = useUserStore()
  const { invites } = useInvitesStore()
  const { notifications } = useNotificationStore()

  const isSoon = SOON_ITEMS.includes(item)

  const receivedInvites = invites.filter(
    (invite) => invite.to_player.user_id === user?.id
  ).length

  const unreadNotifications = notifications.filter(
    (notification) => notification.read_date === null
  ).length

  const isLink = MENU_LINKS.includes(item)

  const constLinksUrl = {
    loja: '/loja',
    ranking: '/ranking',
  }

  const getId = useCallback(() => {
    if (item === 'amigos') return 'step-sidebar04'
    if (item === 'notificações') return 'step-sidebar05'
    if (item === 'suporte') return 'step-sidebar06'

    return ''
  }, [item])

  return (
    <div
      className={twMerge(
        'min-h-[40px] flex-initial rounded transition-colors',
        'hover:bg-purple-400/30',
        'group',
        isSoon && 'opacity-70 hover:bg-transparent'
      )}
      id={getId()}
    >
      <Link
        href={isLink && !isSoon ? constLinksUrl[item as LinkUrlType] : ''}
        asChild={!isLink || isSoon}
        className={twMerge(
          'flex h-full flex-1 items-center gap-3 px-3 py-2',
          isSoon && 'hover:text-gray-300 cursor-default active:text-gray-300'
        )}
        onClick={() => (isSoon || isLink ? null : onClickFunction(item))}
        data-testid={item}
      >
        <button
          className={isLink ? 'flex h-full flex-1 items-center gap-3' : ''}
        >
          <div className="items-center gap-3.5">
            <SidebarMenuItemIcon
              icon={icons[item]}
              size={20}
              className={twMerge(
                'text-gray-300 transition-colors',
                'group-hover:text-white',
                isSoon && 'group-hover:text-gray-30'
              )}
            />

            <span className="text-sm capitalize">{item}</span>
          </div>

          <div className="justify-end">
            {item === 'amigos' && (
              <Badge
                variant="highlight"
                className={
                  receivedInvites > 0
                    ? 'gap-2 text-xs opacity-100'
                    : 'opacity-0'
                }
              >
                <SidebarMenuItemIcon
                  icon={BsEnvelopeFill}
                  size={14}
                  className={twMerge('text-white', 'animate-shake')}
                />

                <span className="capitalize">{receivedInvites}</span>
              </Badge>
            )}

            {item === 'notificações' && (
              <Badge
                variant="highlight"
                className={
                  unreadNotifications > 0
                    ? 'min-h-[22px] min-w-[22px] text-xs opacity-100'
                    : 'opacity-0'
                }
              >
                {unreadNotifications}
              </Badge>
            )}

            {isSoon && <Badge variant="highlight">Em breve</Badge>}
          </div>
        </button>
      </Link>
    </div>
  )
}
