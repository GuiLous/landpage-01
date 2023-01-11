import { createSlice } from '@reduxjs/toolkit'

export const UserReducer = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    update: (state, action) => {
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
      console.log(alreadyExists)
      if (alreadyExists.length > 0) return state

      return {
        ...state,
        account: {
          ...state.account,
          friends: [...state.account.friends, action.payload],
        },
      }
    },
  },
})

export const { update, updateFriend, addFriend } = UserReducer.actions

export default UserReducer.reducer
