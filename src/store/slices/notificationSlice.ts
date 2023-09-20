import { createSlice } from '@reduxjs/toolkit'

export type Notification = {
  id: number
  to_user_id: number
  content: string
  avatar: string
  create_date: Date
  from_user_id: number
  read_date: Date | null
}

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState: [] as Notification[],
  reducers: {
    initNotifications: (_, action) => {
      return action.payload
    },

    addNotification: (state, action) => {
      return [action.payload, ...state]
    },

    readNotification: (state, action) => {
      const notificationsUpdated = state

      notificationsUpdated.map((item) =>
        item.id === action.payload.id
          ? { ...item, read_date: new Date().toISOString() }
          : item
      )

      return [...notificationsUpdated]
    },

    readAllNotifications: (state) => {
      const notificationsUpdated = state

      notificationsUpdated.map((item) => ({
        ...item,
        read_date: new Date().toISOString(),
      }))

      return [...notificationsUpdated]
    },
  },
})

export const {
  addNotification,
  readNotification,
  readAllNotifications,
  initNotifications,
} = notificationSlice.actions

export default notificationSlice.reducer
