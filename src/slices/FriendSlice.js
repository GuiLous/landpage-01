import { createSlice } from '@reduxjs/toolkit'

const updateOrAdd = (list, item, assertionProp) => {
  const exists = list.find(
    (listItem) => listItem[assertionProp] === item[assertionProp]
  )

  const listFiltered = list.filter(
    (listItem) => listItem[assertionProp] !== item[assertionProp]
  )

  return exists ? [...listFiltered, item] : [...list, item]
}

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
      if (action.payload.status === 'offline') {
        return {
          online: [
            ...state.online.filter(
              (friend) => friend.user_id !== action.payload.user_id
            ),
          ],
          offline: updateOrAdd(state.offline, action.payload, 'user_id'),
        }
      } else {
        return {
          offline: [
            ...state.offline.filter(
              (friend) => friend.user_id !== action.payload.user_id
            ),
          ],
          online: updateOrAdd(state.online, action.payload, 'user_id'),
        }
      }
    },
  },
})

export const { initFriends, addFriend, updateFriend } = FriendReducer.actions

export default FriendReducer.reducer
