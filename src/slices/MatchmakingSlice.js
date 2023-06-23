import { createSlice } from '@reduxjs/toolkit'

export const MatchmakingReducer = createSlice({
  name: 'matchmaking',
  initialState: {
    preMatch: null,
    match: null,
  },
  reducers: {
    updatePreMatch: (state, action) => {
      return { ...state, preMatch: action.payload }
    },

    updateMatch: (state, action) => {
      return { ...state, match: action.payload }
    },
  },
})

export const { updatePreMatch, updateMatch } = MatchmakingReducer.actions

export default MatchmakingReducer.reducer
