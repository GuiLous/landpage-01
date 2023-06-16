import { createSlice } from '@reduxjs/toolkit'

export const LobbyReducer = createSlice({
  name: 'lobby',
  initialState: {},
  reducers: {
    initLobby: (state, action) => {
      return action.payload
    },

    restartQueue: (state) => {
      return {
        ...state,
        restart: true,
      }
    },

    removeRestartQueue: (state) => {
      return {
        ...state,
        restart: false,
      }
    },

    updateLobby: (state, action) => {
      return action.payload
    },
  },
})

export const { initLobby, restartQueue, removeRestartQueue, updateLobby } =
  LobbyReducer.actions

export default LobbyReducer.reducer
