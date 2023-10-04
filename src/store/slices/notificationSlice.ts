import { createSlice } from '@reduxjs/toolkit'

export type Notification = {
  id: number
  to_user_id: number
  content: string
  avatar: string
  create_date: Date | string
  from_user_id: number
  read_date: Date | null | string
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
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, read_date: new Date().toISOString() }
          : item
      )
    },

    readAllNotifications: (state) => {
      return state.map((item) => ({
        ...item,
        read_date: new Date().toISOString(),
      }))
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
