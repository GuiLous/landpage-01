import { createSlice } from '@reduxjs/toolkit'
import { uuid4 } from '@utils'

export const AppReducer = createSlice({
  name: 'app',
  initialState: {
    toasts: [],
    friendListOpen: false,
    maintenance: false,
  },
  reducers: {
    addToast: (state, action) => {
      action.payload['id'] = uuid4()
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
  AppReducer.actions

export default AppReducer.reducer
