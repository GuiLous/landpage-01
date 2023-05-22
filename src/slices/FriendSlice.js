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

    updateOrCreateFriend: (state, action) => {
      const online = state.online.filter(
        (friend) => friend.id !== action.payload.friend.id
      )
      const offline = state.online.filter(
        (friend) => friend.id !== action.payload.friend.id
      )
      const newState = { online: online, offline: offline }

      if (action.payload.current === 'online') {
        return { ...newState, online: [...online, action.payload.friend] }
      } else {
        return { ...newState, offline: [...offline, action.payload.friend] }
      }
    },
  },
})

export const { initFriends, updateOrCreateFriend } = FriendReducer.actions

export default FriendReducer.reducer
