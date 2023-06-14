import { createSlice } from '@reduxjs/toolkit'

export const FriendReducer = createSlice({
  name: 'friends',
  initialState: {
    online: [],
    offline: [],
  },
  reducers: {
    initFriends: (state, action) => {
      return action.payload
    },

    addFriend: (state, action) => {
      if (action.payload.status === 'offline') {
        return { ...state, offline: [...state.offline, action.payload] }
      } else {
        return { ...state, online: [...state.online, action.payload] }
      }
    },

    updateFriend: (state, action) => {
      const onlineFriend = state.online.find(
        (friend) => friend.id === action.payload.id
      )

      if (onlineFriend) {
        return {
          ...state,
          online: [...state.online, action.payload],
        }
      } else {
        return {
          ...state,
          offline: [...state.offline, action.payload],
        }
      }
    },
  },
})

export const { initFriends, addFriend, updateFriend } = FriendReducer.actions

export default FriendReducer.reducer
