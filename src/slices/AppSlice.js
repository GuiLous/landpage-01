import { createSlice } from '@reduxjs/toolkit'
import { uuid4 } from '@utils'

export const AppReducer = createSlice({
  name: 'friends',
  initialState: {
    toasts: [],
    friendListOpen: false,
  },
  reducers: {
    addToast: (state, action) => {
      action.payload['id'] = uuid4()
      return [action.payload, ...state]
    },

    removeToast: (state, action) => {
      return state.filter((item) => item.id !== action.payload)
    },

    toggleFriendList: (state, action) => {
      return { ...state, friendListOpen: action }
    },
  },
})

export const { addToast, removeToast, toggleFriendList } = AppReducer.actions

export default AppReducer.reducer
