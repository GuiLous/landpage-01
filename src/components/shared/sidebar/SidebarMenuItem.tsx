'use client'

import { useState } from 'react'
import { AiFillBell } from 'react-icons/ai'
import { BiSolidMessage } from 'react-icons/bi'
import { BsEnvelopeFill } from 'react-icons/bs'
import { FaUserFriends } from 'react-icons/fa'
import { IoExitOutline } from 'react-icons/io5'
import { MdOutlineBarChart, MdShoppingCart } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'

import { MENU_LINKS, SOON_ITEMS } from '@/constants'

import { useAppSelector } from '@/store'

import {
  Badge,
  DrawerFriends,
  DrawerNotifications,
  Link,
  ModalLogout,
  ModalSupport,
} from '@/components/shared'

import { SidebarMenuItemIcon } from './SidebarMenuItemIcon'

interface SidebarMenuItemProps {
  item: 'amigos' | 'notificações' | 'ranking' | 'loja' | 'suporte' | 'sair'
}

const icons = {
  amigos: FaUserFriends,
  notificações: AiFillBell,
  ranking: MdOutlineBarChart,
  loja: MdShoppingCart,
  suporte: BiSolidMessage,
  sair: IoExitOutline,
}

export function SidebarMenuItem({ item }: SidebarMenuItemProps) {
  const { user } = useAppSelector((state) => state.user)
  const { invites } = useAppSelector((state) => state.invites)
  const notifications = useAppSelector((state) => state.notifications)

  const [openModalSupport, setOpenModalSupport] = useState(false)
  const [openModalLogout, setOpenModalLogout] = useState(false)
  const [openDrawerNotifications, setOpenDrawerNotifications] = useState(false)
  const [openDrawerFriends, setOpenDrawerFriends] = useState(false)

  const isSoon = SOON_ITEMS.includes(item)

  const receivedInvites = invites.filter(
    (invite) => invite.to_player.user_id === user?.id
  ).length

  const unreadNotifications = notifications.filter(
    (notification) => notification.read_date === null
  ).length

  const isLink = MENU_LINKS.includes(item)

  const onClickFunction = ({ item }: SidebarMenuItemProps) => {
    switch (item) {
      case 'amigos':
        setOpenDrawerFriends(true)
        break

      case 'notificações':
        setOpenDrawerNotifications(true)
        break

      case 'suporte':
        setOpenModalSupport(true)
        break

      case 'sair':
        setOpenModalLogout(true)
        break

      default:
        return null
    }
  }

  return (
    <div
      className={twMerge(
        'min-h-[40px] flex-initial rounded-[4px] transition-colors hover:bg-purple-400/30 group',
        isSoon && 'opacity-70 hover:bg-transparent'
      )}
    >
      <Link
        href={isLink ? '/' : ''}
        asChild
        className={twMerge(
          'flex h-full flex-1 items-center gap-3 px-3 py-2',
          isSoon &&
            'hover:text-gray-300 cursor-default active:text-gray-300 pr-0'
        )}
        onClick={() => (isSoon ? null : onClickFunction({ item }))}
        data-testid={item}
      >
        <button
          className={isLink ? 'flex h-full flex-1 items-center gap-3' : ''}
        >
          <div className="items-center gap-3.5">
            <SidebarMenuItemIcon
              icon={icons[item]}
              size={22}
              className={twMerge(
                'text-gray-300 transition-colors group-hover:text-white',
                isSoon && 'group-hover:text-gray-30'
              )}
            />

            <span className="text-sm capitalize">{item}</span>
          </div>

          <div className="justify-end">
            {item === 'amigos' && (
              <Badge
                highlight
                className={
                  receivedInvites > 0
                    ? 'gap-2 text-xs opacity-100'
                    : 'opacity-0'
                }
              >
                <SidebarMenuItemIcon
                  icon={BsEnvelopeFill}
                  size={14}
                  className="animate-shake text-white"
                />

                <span className="capitalize">{receivedInvites}</span>
              </Badge>
            )}

            {item === 'notificações' && (
              <Badge
                highlight
                className={
                  unreadNotifications > 0
                    ? 'min-h-[22px] min-w-[22px] text-xs opacity-100'
                    : 'opacity-0'
                }
              >
                {unreadNotifications}
              </Badge>
            )}

            {isSoon && <Badge highlight>Em breve</Badge>}
          </div>
        </button>
      </Link>

      <ModalSupport open={openModalSupport} setOpen={setOpenModalSupport} />
      <ModalLogout open={openModalLogout} setOpen={setOpenModalLogout} />
      <ModalLogout open={openModalLogout} setOpen={setOpenModalLogout} />
      <DrawerNotifications
        open={openDrawerNotifications}
        setOpen={setOpenDrawerNotifications}
      />
      <DrawerFriends open={openDrawerFriends} setOpen={setOpenDrawerFriends} />
    </div>
  )
}
