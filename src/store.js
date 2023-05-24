import { configureStore } from '@reduxjs/toolkit'

import FriendReducer from './slices/FriendSlice.js'
import InviteReducer from './slices/InviteSlice'
import MatchReducer from './slices/MatchSlice'
import NotificationReducer from './slices/NotificationSlice'
import ToastReducer from './slices/ToastSlice'
import UserReducer from './slices/UserSlice'

export default configureStore({
  reducer: {
    user: UserReducer,
    invites: InviteReducer,
    match: MatchReducer,
    notifications: NotificationReducer,
    toasts: ToastReducer,
    friends: FriendReducer,
  },
  devTools: true,
})
