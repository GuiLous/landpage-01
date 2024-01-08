import { create } from 'zustand'

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
}

type UserStore = {
  user: User | null
  updateUser: (user: User | null) => void
  addUserInvite: (email: string) => void
}

export const useUserStore = create<UserStore>()((set) => ({
  user: null,
  updateUser: (user: User | null) =>
    set(() => ({
      user,
    })),
  addUserInvite: (email: string) =>
    set((state) => ({
      user: state.user && {
        ...state.user,
        invites: [...state.user?.invites, { email, accepted: false }],
        invites_available_count: state.user.invites_available_count - 1,
      },
    })),
}))
