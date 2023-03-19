import { createSlice } from '@reduxjs/toolkit'

export const MatchReducer = createSlice({
  name: 'match',
  initialState: {
    preMatch: null,
    match: null,
  },
  reducers: {
    preMatch: (state, action) => {
      return { ...state, preMatch: action.payload }
    },
  },
})

export const { preMatch } = MatchReducer.actions

export default MatchReducer.reducer
