import { createSlice } from '@reduxjs/toolkit'

export const NotificationReducer = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    initNotifications: (state, action) => {
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

    readAllNotifications: (state, action) => {
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
} = NotificationReducer.actions

export default NotificationReducer.reducer
