import { configureStore } from '@reduxjs/toolkit'

import AppReducer from './slices/AppSlice'
import FriendReducer from './slices/FriendSlice.js'
import InviteReducer from './slices/InviteSlice'
import LobbyReducer from './slices/LobbySlice'
import MaintenanceReducer from './slices/MaintenanceSlice'
import MatchReducer from './slices/MatchSlice'
import NotificationReducer from './slices/NotificationSlice'
import PreMatchReducer from './slices/PreMatchSlice'
import UserReducer from './slices/UserSlice'

export default configureStore({
  reducer: {
    user: UserReducer,
    invites: InviteReducer,
    match: MatchReducer,
    notifications: NotificationReducer,
    friends: FriendReducer,
    app: AppReducer,
    lobby: LobbyReducer,
    preMatch: PreMatchReducer,
    maintenance: MaintenanceReducer,
  },
  devTools: true,
})
