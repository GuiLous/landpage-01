import { createSlice } from '@reduxjs/toolkit'

export const NotificationReducer = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    addNotification: (state, action) => {
      return [action.payload, ...state]
    },
  },
})

export const { addNotification } = NotificationReducer.actions

export default NotificationReducer.reducer
