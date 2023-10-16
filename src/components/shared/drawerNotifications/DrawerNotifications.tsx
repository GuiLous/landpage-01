'use client'

import { twMerge } from 'tailwind-merge'

import { storageService } from '@/services'

import { useAppDispatch, useAppSelector } from '@/store'
import { readNotification } from '@/store/slices/notificationSlice'

import { notificationsApi } from '@/api'

import { Drawer, ScrollArea } from '@/components/shared'

import { useShowErrorToast } from '@/hooks'

import { DrawerNotificationsFooter } from './DrawerNotificationsFooter'
import { DrawerNotificationsItem } from './DrawerNotificationsItem'

interface DrawerNotificationsProps {
  open: boolean
  setOpen: (state: boolean) => void
}

export function DrawerNotifications({
  open,
  setOpen,
}: DrawerNotificationsProps) {
  const notifications = useAppSelector((state) => state.notifications)

  const dispatch = useAppDispatch()

  const showErrorToast = useShowErrorToast()

  const read = async (id: number) => {
    const userToken = storageService.get('token')

    if (!userToken) return

    const isAlreadyRead =
      notifications.find((notification) => notification.id === id)
        ?.read_date !== null

    if (!isAlreadyRead) {
      const response = await notificationsApi.read(userToken, id)
      if (response.errorMsg) showErrorToast(response.errorMsg)
      else if (response) dispatch(readNotification({ id }))
    }
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <Drawer.Content
        title="Notificações"
        className="z-20 max-w-[350px] select-none 3xl:max-w-[300px]"
      >
        <div
          className={twMerge(
            'flex-col items-center justify-start mt-6',
            notifications.length <= 0 && 'justify-center'
          )}
        >
          {notifications.length > 0 ? (
            <ScrollArea className="max-h-[calc(100vh_-_64px)]">
              {notifications.map((notification) => (
                <DrawerNotificationsItem
                  key={notification.id}
                  avatar={notification.avatar}
                  content={notification.content}
                  isRead={notification.read_date !== null}
                  create_date={notification.create_date}
                  onMouseEnter={() => read(notification.id)}
                />
              ))}
            </ScrollArea>
          ) : (
            <p className="text-xs text-white">Você não tem notificações</p>
          )}
        </div>

        <DrawerNotificationsFooter />
      </Drawer.Content>
    </Drawer>
  )
}
