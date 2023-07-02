import { createSlice } from '@reduxjs/toolkit'

export const PreMatchReducer = createSlice({
  name: 'preMatch',
  initialState: null,
  reducers: {
    updatePreMatch: (state, action) => {
      state = action.payload
      return state
    },
  },
})

export const { updatePreMatch } = PreMatchReducer.actions

export default PreMatchReducer.reducer
