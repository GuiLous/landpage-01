import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type PreMatch = {
  id: number
  state: string
  countdown: number | null
  players_ready_count: number
  players_total: number
  user_ready: boolean
}

type PreMatchState = {
  preMatch: PreMatch | null
}

const initialState: PreMatchState = {
  preMatch: null,
}

export const preMatchSlice = createSlice({
  name: 'preMatch',
  initialState,
  reducers: {
    updatePreMatch: (state, action: PayloadAction<PreMatch>) => {
      state.preMatch = action.payload
      return state
    },
  },
})

export const { updatePreMatch } = preMatchSlice.actions

export default preMatchSlice.reducer
