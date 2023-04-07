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

    match: (state, action) => {
      return { ...state, match: action.payload }
    },
  },
})

export const { preMatch, match } = MatchReducer.actions

export default MatchReducer.reducer
