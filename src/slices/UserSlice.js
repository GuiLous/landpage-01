import { createSlice } from '@reduxjs/toolkit'

export const UserReducer = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    updateUser: (state, action) => {
      state = action.payload
      return state
    },

    updateLobbyId: (state, action) => {
      return { ...state, lobby_id: action.payload }
    },

    restartQueue: (state) => {
      return {
        ...state,
        account: {
          ...state.account,
          lobby: {
            ...state.account.lobby,
            restart: true,
          },
        },
      }
    },

    removeRestartQueue: (state) => {
      return {
        ...state,
        account: {
          ...state.account,
          lobby: {
            ...state.account.lobby,
            restart: false,
          },
        },
      }
    },
  },
})

export const { updateUser, restartQueue, removeRestartQueue, updateLobbyId } =
  UserReducer.actions

export default UserReducer.reducer
