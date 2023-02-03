import { configureStore } from '@reduxjs/toolkit'

import InviteReducer from './slices/InviteSlice'
import UserReducer from './slices/UserSlice'

export default configureStore({
  reducer: {
    user: UserReducer,
    invites: InviteReducer,
  },
  devTools: true,
})
