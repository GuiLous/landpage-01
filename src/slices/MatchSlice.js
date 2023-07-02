import { createSlice } from '@reduxjs/toolkit'

export const MatchReducer = createSlice({
  name: 'match',
  initialState: null,
  reducers: {
    updateMatch: (state, action) => {
      state = action.payload
      return state
    },
  },
})

export const { updateMatch } = MatchReducer.actions

export default MatchReducer.reducer
