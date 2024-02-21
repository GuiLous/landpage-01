import zukeeper from 'zukeeper'
import { create } from 'zustand'

import { LatestMatchesResult, Player } from './lobbyStore'
import { Avatar, Status } from './userStore'

export type RequestInfo = {
  id: number
  user_from: Player
  user_to: Player
  accept_date: string | null
  create_date: string
}

type Request = {
  sent: RequestInfo[]
  received: RequestInfo[]
}

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
  requests: Request
}

type FriendsStore = {
  friends: Friends | null
  initFriends: (friends: Friends) => void
  addFriend: (friend: Friend) => void
  updateFriend: (friend: Friend) => void
  removeFriend: (status: string, user_id: number) => void
  addFriendRequest: (request: RequestInfo) => void
  addFriendSentRequest: (request: RequestInfo) => void
  removeFriendSentRequest: (user_id: number) => void
  removeFriendRequest: (user_id: number) => void
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

export const useFriendsStore = create<FriendsStore>(
  zukeeper((set: any) => ({
    friends: null,
    initFriends: (friends: Friends) => set(() => ({ friends })),

    addFriend: (friend: Friend) =>
      set((state: FriendsStore) => {
        if (friend.status === 'online') {
          return {
            friends: state.friends && {
              ...state.friends,
              online: [...state.friends.online, friend],
            },
          }
        } else {
          return {
            friends: state.friends && {
              ...state.friends,
              offline: [...state.friends.offline, friend],
            },
          }
        }
      }),

    updateFriend: (friend: Friend) =>
      set((state: FriendsStore) => {
        if (friend.status === 'offline') {
          return {
            friends: state.friends && {
              ...state.friends,
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
              ...state.friends,
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

    removeFriend: (status: string, user_id: number) =>
      set((state: FriendsStore) => {
        return {
          friends: state.friends && {
            ...state.friends,
            [status === 'online' ? 'online' : 'offline']: state.friends[
              status === 'online' ? 'online' : 'offline'
            ].filter((friendItem) => friendItem.user_id !== user_id),
          },
        }
      }),

    addFriendRequest: (request: RequestInfo) =>
      set((state: FriendsStore) => {
        return {
          friends: state.friends && {
            ...state.friends,
            requests: {
              ...state.friends.requests,
              received: [...state.friends.requests.received, request],
            },
          },
        }
      }),

    addFriendSentRequest: (request: RequestInfo) =>
      set((state: FriendsStore) => {
        return {
          friends: state.friends && {
            ...state.friends,
            requests: {
              ...state.friends.requests,
              sent: [...state.friends.requests.sent, request],
            },
          },
        }
      }),

    removeFriendSentRequest: (user_id: number) =>
      set((state: FriendsStore) => {
        return {
          friends: state.friends && {
            ...state.friends,
            requests: {
              ...state.friends.requests,
              sent: state.friends.requests.sent.filter(
                (request) => request.user_to.user_id !== user_id
              ),
            },
          },
        }
      }),

    removeFriendRequest: (user_id: number) =>
      set((state: FriendsStore) => {
        return {
          friends: state.friends && {
            ...state.friends,
            requests: {
              ...state.friends.requests,
              received: state.friends.requests.received.filter(
                (request) => request.user_from.user_id !== user_id
              ),
            },
          },
        }
      }),
  }))
)
