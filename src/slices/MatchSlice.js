import { createSlice } from '@reduxjs/toolkit'

export const MatchReducer = createSlice({
  name: 'match',
  initialState: null,
  reducers: {
    updateMatch: (state, action) => {
      state = action.payload
      return state
    },

    cancelMatch: (state, action) => {
      return {
        ...state,
        status: 'cancelled',
      }
    },
  },
})

export const { updateMatch, cancelMatch } = MatchReducer.actions

export default MatchReducer.reducer
