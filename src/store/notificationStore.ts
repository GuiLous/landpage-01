import zukeeper from 'zukeeper'
import { create } from 'zustand'

export type Notification = {
  id: number
  to_user_id: number
  content: string
  avatar: string
  create_date: Date | string
  from_user_id: number
  read_date: Date | null | string
}

type NotificationStore = {
  notifications: Notification[]
  initNotifications: (notifications: Notification[]) => void
  addNotification: (notification: Notification) => void
  readNotification: (notificationId: number) => void
  readAllNotifications: () => void
}

export const useNotificationStore = create<NotificationStore>(
  zukeeper((set: any) => ({
    notifications: [],
    initNotifications: (notifications: Notification[]) =>
      set(() => ({
        notifications,
      })),
    addNotification: (notification: Notification) =>
      set((state: NotificationStore) => ({
        notifications: [...state.notifications, notification],
      })),
    readNotification: (notificationId: number) =>
      set((state: NotificationStore) => ({
        notifications: state.notifications.map((item) =>
          item.id === notificationId
            ? { ...item, read_date: new Date().toISOString() }
            : item
        ),
      })),
    readAllNotifications: () =>
      set((state: NotificationStore) => ({
        notifications: state.notifications.map((item) => ({
          ...item,
          read_date: new Date().toISOString(),
        })),
      })),
  }))
)
