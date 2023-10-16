import { createSlice } from '@reduxjs/toolkit'

import { uuid4 } from '@/functions'

export type Toast = {
  id: number
  title: string
  content: string
  duration: number
  variant: string
}

export type AppState = {
  toasts: Toast[]
  friendListOpen: boolean
  maintenance: boolean
}

const initialState: AppState = {
  toasts: [],
  friendListOpen: false,
  maintenance: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addToast: (state, action) => {
      action.payload.id = uuid4()
      return { ...state, toasts: [...state.toasts, action.payload] }
    },

    removeToast: (state, action) => {
      return {
        ...state,
        toasts: state.toasts.filter((item) => item.id !== action.payload),
      }
    },

    toggleFriendList: (state, action) => {
      return { ...state, friendListOpen: action.payload }
    },

    updateMaintenance: (state, action) => {
      return {
        ...state,
        maintenance: action.payload,
      }
    },
  },
})

export const { addToast, removeToast, toggleFriendList, updateMaintenance } =
  appSlice.actions

export default appSlice.reducer
