import { createSlice } from '@reduxjs/toolkit'
import { uuid4 } from '@utils'

export const ToastReducer = createSlice({
  name: 'toasts',
  initialState: [],
  reducers: {
    addToast: (state, action) => {
      action.payload['id'] = uuid4()
      return [action.payload, ...state]
    },

    removeToast: (state, action) => {
      return state.filter((item) => item.id !== action.payload)
    },
  },
})

export const { addToast, removeToast } = ToastReducer.actions

export default ToastReducer.reducer
