import { createSlice } from '@reduxjs/toolkit'

export const UserReducer = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    updateUser: (state, action) => {
      state = action.payload
      return state
    },

    updateFriend: (state, action) => {
      const updatedItems = state.account.friends.map((friend) =>
        friend.id === action.payload.id ? action.payload : friend
      )
      return {
        ...state,
        account: { ...state.account, friends: updatedItems },
      }
    },

    addFriend: (state, action) => {
      const alreadyExists = state.account.friends.filter(
        (friend) => friend.id === action.payload.id
      )
      if (alreadyExists.length > 0) return state

      return {
        ...state,
        account: {
          ...state.account,
          friends: [...state.account.friends, action.payload],
        },
      }
    },

    updateLobby: (state, action) => {
      return {
        ...state,
        account: {
          ...state.account,
          lobby: action.payload,
        },
      }
    },

    addInvite: (state, action) => {
      return {
        ...state,
        account: {
          ...state.account,
          lobby_invites: [...state.account.lobby_invites, action.payload],
        },
      }
    },
  },
})

export const { updateUser, updateFriend, addFriend, updateLobby, addInvite } =
  UserReducer.actions

export default UserReducer.reducer
