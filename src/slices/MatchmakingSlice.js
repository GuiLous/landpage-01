import { createSlice } from '@reduxjs/toolkit'

export const MatchmakingReducer = createSlice({
  name: 'matchmaking',
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

export const { preMatch, match } = MatchmakingReducer.actions

export default MatchmakingReducer.reducer
