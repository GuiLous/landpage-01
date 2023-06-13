import { createSlice } from '@reduxjs/toolkit'

export const LobbyReducer = createSlice({
  name: 'lobby',
  initialState: {},
  reducers: {
    initLobby: (state, action) => {
      return action.payload
    },

    updateLobby: (state, action) => {
      return action.payload
    },
  },
})

export const { initLobby, updateLobby } = LobbyReducer.actions

export default LobbyReducer.reducer
