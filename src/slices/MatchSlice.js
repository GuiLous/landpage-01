import { createSlice } from '@reduxjs/toolkit'

export const MatchReducer = createSlice({
  name: 'match',
  initialState: {
    preMatch: null,
    match: null,
  },
  reducers: {
    preMatch: (state, action) => {
      if (state.preMatch) return
      else return { ...state, preMatch: action.payload }
    },

    updatePreMatch: (state, action) => {
      return { ...state, preMatch: action.payload }
    },
  },
})

export const { preMatch, updatePreMatch } = MatchReducer.actions

export default MatchReducer.reducer
