import { createSlice } from '@reduxjs/toolkit'

export const MatchReducer = createSlice({
  name: 'match',
  initialState: {
    match: null,
  },
  reducers: {
    updateMatch: (state, action) => {
      state = action.payload
      return state
    },
  },
})

export const { updateMatch } = MatchReducer.actions

export default MatchReducer.reducer
