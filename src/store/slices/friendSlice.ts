import { createSlice } from '@reduxjs/toolkit'

import { Avatar, Status } from './userSlice'

export type Friend = {
  steamid: string
  username: string
  level: number
  level_points: number
  user_id: number
  avatar: Avatar
  status: Status
  steam_url: string
  lobby_id: number | null
}

type FriendState = {
  online: Friend[]
  offline: Friend[]
}

const initialState: FriendState = {
  online: [],
  offline: [],
}

const updateOrAdd = (
  list: Friend[],
  item: Friend,
  assertionProp: 'user_id'
) => {
  const exists = list.find(
    (listItem) => listItem[assertionProp] === item[assertionProp]
  )

  const listFiltered = list.filter(
    (listItem) => listItem[assertionProp] !== item[assertionProp]
  )

  return exists ? [...listFiltered, item] : [...list, item]
}

export const friendSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    initFriends: (_, action) => {
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

export const { initFriends, addFriend, updateFriend } = friendSlice.actions

export default friendSlice.reducer
