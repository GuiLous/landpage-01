import { createSlice } from '@reduxjs/toolkit'

import { uuid4 } from '@utils'

export const NotificationReducer = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    addNotification: (state, action) => {
      action.payload['id'] = uuid4()
      return [...state, action.payload]
    },

    removeNotification: (state, action) => {
      return state.filter((item) => item.id !== action.payload)
    },
  },
})

export const { addNotification, removeNotification } =
  NotificationReducer.actions

export default NotificationReducer.reducer
