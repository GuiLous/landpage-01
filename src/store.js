import { configureStore } from '@reduxjs/toolkit'

import NotificationReducer from './slices/NotificationSlice'
import UserReducer from './slices/UserSlice'

export default configureStore({
  reducer: {
    user: UserReducer,
    notifications: NotificationReducer,
  },
  devTools: true,
})
