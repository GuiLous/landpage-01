import zukeeper from 'zukeeper'
import { create } from 'zustand'

export type UserFeats =
  | 'rc'
  | 'inventory'
  | 'support'
  | 'profiles'
  | 'friends'
  | 'comp_lobby'
  | 'store'
  | 'custom_lobby'
  | 'ranking'

export type Status =
  | 'online'
  | 'offline'
  | 'queued'
  | 'in_game'
  | 'teaming'
  | 'away'

export type UserInvites = {
  email: string
  accepted: boolean
}

export type Avatar = {
  small: string
  medium: string
  large: string
}

export type Account = {
  steamid?: string
  username?: string
  level?: number
  level_points?: number
  is_verified?: boolean
  avatar?: Avatar
  coins: number
}

export type User = {
  id: number
  email: string
  is_active: boolean
  account?: Account
  is_online: boolean
  status: Status
  lobby_id: number
  match_id: number | null
  pre_match_id: number | null
  invites_available_count: number
  invites: UserInvites[]
  feats: UserFeats[]
}

type UserStore = {
  user: User | null
  updateUser: (user: User | null) => void
  addUserInvite: (email: string) => void
}

export const useUserStore = create<UserStore>()(
  zukeeper((set: any) => ({
    user: null,
    updateUser: (user: User | null) =>
      set(() => ({
        user,
      })),
    addUserInvite: (email: string) =>
      set((state: UserStore) => ({
        user: state.user && {
          ...state.user,
          invites: [...state.user?.invites, { email, accepted: false }],
          invites_available_count: state.user.invites_available_count - 1,
        },
      })),
  }))
)
