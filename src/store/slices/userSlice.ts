import { createSlice } from '@reduxjs/toolkit'

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

type UserState = {
  user: User | null
}

const initialState: UserState = {
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload
      return state
    },

    updateLobbyId: (state, action) => {
      if (!state.user) return

      return { user: { ...state.user, lobby_id: action.payload } }
    },

    addUserInvite: (state, action) => {
      if (!state.user) return

      return {
        user: {
          ...state.user,
          invites: [
            ...state.user.invites,
            { email: action.payload, accepted: false },
          ],
          invites_available_count: state.user.invites_available_count - 1,
        },
      }
    },
  },
})

export const { updateUser, updateLobbyId, addUserInvite } = userSlice.actions

export default userSlice.reducer
