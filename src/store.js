import { configureStore } from '@reduxjs/toolkit'

import AppReducer from './slices/AppSlice'
import FriendReducer from './slices/FriendSlice.js'
import InviteReducer from './slices/InviteSlice'
import MatchReducer from './slices/MatchSlice'
import NotificationReducer from './slices/NotificationSlice'
import UserReducer from './slices/UserSlice'

export default configureStore({
  reducer: {
    user: UserReducer,
    invites: InviteReducer,
    match: MatchReducer,
    notifications: NotificationReducer,
    friends: FriendReducer,
    app: AppReducer,
  },
  devTools: true,
})
