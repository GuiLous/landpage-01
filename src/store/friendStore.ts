import { create } from 'zustand'

import { LatestMatchesResult } from './lobbyStore'
import { Avatar, Status } from './userStore'

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
  matches_played?: number
  latest_matches_results?: LatestMatchesResult[]
  card: string | null
}

type Friends = {
  online: Friend[]
  offline: Friend[]
}

type FriendsStore = {
  friends: Friends | null
  initFriends: (friends: Friends) => void
  addFriend: (friend: Friend) => void
  updateFriend: (friend: Friend) => void
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

export const useFriendsStore = create<FriendsStore>((set) => ({
  friends: null,
  initFriends: (friends: Friends) => set(() => ({ friends })),
  addFriend: (friend: Friend) =>
    set((state) => {
      if (friend.status === 'offline') {
        return {
          friends: state.friends && {
            ...state.friends,
            offline: [...state.friends.offline, friend],
          },
        }
      } else {
        return {
          friends: state.friends && {
            ...state.friends,
            online: [...state.friends.online, friend],
          },
        }
      }
    }),
  updateFriend: (friend: Friend) =>
    set((state) => {
      if (friend.status === 'offline') {
        return {
          friends: state.friends && {
            online: [
              ...state.friends.online.filter(
                (friendItem) => friendItem.user_id !== friend.user_id
              ),
            ],
            offline: updateOrAdd(state.friends.offline, friend, 'user_id'),
          },
        }
      } else {
        return {
          friends: state.friends && {
            offline: [
              ...state.friends.offline.filter(
                (friendItem) => friendItem.user_id !== friend.user_id
              ),
            ],
            online: updateOrAdd(state.friends.online, friend, 'user_id'),
          },
        }
      }
    }),
}))
