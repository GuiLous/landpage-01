import zukeeper from 'zukeeper'
import { create } from 'zustand'

import { uuid4 } from '@/utils'

export type Variant =
  | 'error'
  | 'warning'
  | 'success'
  | 'invite'
  | 'notification'
  | 'info'

export type Toast = {
  id?: string
  title?: string
  content?: string
  duration?: number
  variant?: Variant
  avatar?: string
  invite_id?: string
}

export type App = {
  toasts: Toast[]
  friendListOpen: boolean
  maintenance: boolean
}

type AppStore = {
  app: App
  addToast: (toast: Toast) => void
  removeToast: (id: string) => void
  toggleFriendList: (open: boolean) => void
  updateMaintenance: (maintenance: boolean) => void
}

export const useAppStore = create<AppStore>(
  zukeeper((set: any) => ({
    app: {
      toasts: [],
      friendListOpen: false,
      maintenance: false,
    },
    addToast: (toast: Toast) =>
      set((state: AppStore) => {
        toast.id = uuid4()

        return { app: { ...state.app, toasts: [...state.app.toasts, toast] } }
      }),
    removeToast: (id: string) =>
      set((state: AppStore) => {
        return {
          app: {
            ...state.app,
            toasts: state.app.toasts.filter((item) => item.id !== id),
          },
        }
      }),
    toggleFriendList: (open: boolean) =>
      set((state: AppStore) => ({
        app: { ...state.app, friendListOpen: open },
      })),
    updateMaintenance: (maintenance: boolean) =>
      set((state: AppStore) => ({ app: { ...state.app, maintenance } })),
  }))
)
