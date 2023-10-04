import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import appReducer from './slices/appSlice'
import friendReducer from './slices/friendSlice'
import inviteReducer from './slices/inviteSlice'
import lobbyReducer from './slices/lobbySlice'
import matchReducer from './slices/matchSlice'
import notificationReducer from './slices/notificationSlice'
import preMatchReducer from './slices/preMatchSlice'
import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    friend: friendReducer,
    invites: inviteReducer,
    lobby: lobbyReducer,
    match: matchReducer,
    notifications: notificationReducer,
    preMatch: preMatchReducer,
    user: userReducer,
  },
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch
