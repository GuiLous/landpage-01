import { createSlice } from '@reduxjs/toolkit'

export const LobbyReducer = createSlice({
  name: 'lobby',
  initialState: {},
  reducers: {
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

    updateQueueTime: (state, action) => {
      return { ...state, queue_time: action.payload }
    },
  },
})

export const {
  restartQueue,
  removeRestartQueue,
  updateLobby,
  updateQueueTime,
} = LobbyReducer.actions

export default LobbyReducer.reducer
