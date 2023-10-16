import { createSlice } from '@reduxjs/toolkit'

export type Status =
  | 'online'
  | 'offline'
  | 'queued'
  | 'in_game'
  | 'teaming'
  | 'away'

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
  },
})

export const { updateUser, updateLobbyId } = userSlice.actions

export default userSlice.reducer
