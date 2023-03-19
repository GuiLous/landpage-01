import { configureStore } from '@reduxjs/toolkit'

import InviteReducer from './slices/InviteSlice'
import MatchReducer from './slices/MatchSlice'
import UserReducer from './slices/UserSlice'

export default configureStore({
  reducer: {
    user: UserReducer,
    invites: InviteReducer,
    match: MatchReducer,
  },
  devTools: true,
})
