import { createSlice } from '@reduxjs/toolkit'

import { InviteElement } from './inviteSlice'
import { Avatar } from './userSlice'

export type LatestMatchesResult = 'D' | 'N/A' | 'V'

export type Player = {
  level: number
  username: string
  user_id: number
  avatar: Avatar
  matches_played: number
  latest_matches_results: LatestMatchesResult[]
  steam_url: string
  status: string
}

export type Lobby = {
  id: number
  owner_id: number
  players_ids: number[]
  players?: Player[]
  invites?: InviteElement[]
  invited_players_ids: number[]
  seats: number
  queue: Date | null
  queue_time: number | null
  restriction_countdown: number | null
}

export const lobbySlice = createSlice({
  name: 'lobby',
  initialState: {} as Lobby,
  reducers: {
    updateLobby: (_, action) => {
      return action.payload
    },

    updateQueueTime: (state, action) => {
      return { ...state, queue_time: action.payload }
    },
  },
})

export const { updateLobby, updateQueueTime } = lobbySlice.actions

export default lobbySlice.reducer
