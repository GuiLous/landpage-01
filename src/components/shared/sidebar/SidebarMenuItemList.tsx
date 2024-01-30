'use client'

import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { SIDEBAR_BOTTOM_MENU_ITEMS, SIDEBAR_TOP_MENU_ITEMS } from '@/constants'

import { revalidatePath } from '@/utils'

import { useAppStore } from '@/store/appStore'

import {
  DrawerFriends,
  DrawerNotifications,
  ModalLogout,
  ModalSupport,
} from '@/components/shared'

import { SidebarMenuItem } from './SidebarMenuItem'

type ItemMenu =
  | 'amigos'
  | 'notificações'
  | 'ranking'
  | 'loja'
  | 'suporte'
  | 'sair'

export function SidebarMenuItemList() {
  const { toggleFriendList, app } = useAppStore()
  const friendListOpenByApp = app.friendListOpen

  const [openModalSupport, setOpenModalSupport] = useState(false)
  const [openModalLogout, setOpenModalLogout] = useState(false)
  const [openDrawerNotifications, setOpenDrawerNotifications] = useState(false)
  const [openDrawerFriends, setOpenDrawerFriends] = useState(false)

  const handleCloseFriendListDrawer = () => {
    setOpenDrawerFriends(false)
    toggleFriendList(false)
    revalidatePath({ path: '/' })
  }

  const handleToggleFriendListDrawer = () => {
    if (openDrawerFriends) {
      toggleFriendList(false)
      setOpenDrawerFriends(false)
    } else {
      toggleFriendList(true)
      setOpenDrawerFriends(true)
    }
    revalidatePath({ path: '/' })
  }

  const onClickFunction = (item: ItemMenu) => {
    switch (item) {
      case 'amigos':
        handleToggleFriendListDrawer()
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

  useEffect(() => {
    setOpenDrawerFriends(friendListOpenByApp)
  }, [friendListOpenByApp])

  return (
    <div
      className={twMerge(
        'flex-initial flex-col gap-7 px-7',
        '3xl:gap-6 3xl:px-6'
      )}
    >
      <div className="flex-initial flex-col">
        {SIDEBAR_TOP_MENU_ITEMS.map((item) => (
          <SidebarMenuItem
            key={item}
            item={item as ItemMenu}
            onClickFunction={onClickFunction}
          />
        ))}
      </div>

      <div className="flex-initial flex-col">
        {SIDEBAR_BOTTOM_MENU_ITEMS.map((item) => (
          <SidebarMenuItem
            key={item}
            item={item as ItemMenu}
            onClickFunction={onClickFunction}
          />
        ))}
      </div>

      <ModalSupport open={openModalSupport} setOpen={setOpenModalSupport} />
      <ModalLogout open={openModalLogout} setOpen={setOpenModalLogout} />
      <ModalLogout open={openModalLogout} setOpen={setOpenModalLogout} />
      <DrawerNotifications
        open={openDrawerNotifications}
        setOpen={setOpenDrawerNotifications}
      />
      <DrawerFriends
        open={openDrawerFriends}
        setOpen={handleCloseFriendListDrawer}
      />
    </div>
  )
}
