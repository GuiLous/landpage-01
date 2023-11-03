import { createSlice } from '@reduxjs/toolkit'

import { Avatar, Status } from './userSlice'

const stats = {
  kills: 0,
  deaths: 0,
  assists: 0,
  damage: 0,
  hs_kills: 0,
  afk: 0,
  plants: 0,
  defuses: 0,
  double_kills: 0,
  triple_kills: 0,
  quadra_kills: 0,
  aces: 0,
  clutch_v1: 0,
  clutch_v2: 0,
  clutch_v3: 0,
  clutch_v4: 0,
  clutch_v5: 0,
  firstkills: 0,
  shots_fired: 0,
  head_shots: 0,
  chest_shots: 0,
  other_shots: 0,
  rounds_played: 0,
  clutches: 0,
  shots_hit: 0,
  adr: 0,
  kdr: 0,
  kda: 0,
  ahk: 0,
  ahr: 0,
  hsk: 0,
  accuracy: 0,
  head_accuracy: 0,
  chest_accuracy: 0,
  others_accuracy: 0,
}

export type Stats = typeof stats

export type Map = {
  id: number
  name: string
  sys_name: string
  is_active: boolean
}

export type Progress = {
  level_before: number
  level_after: number
  level_points_before: number
  level_points_after: number
  points_earned: number | null
}

export type Player = {
  id: number
  match_id: number
  team_id: number
  user_id: number
  username: string
  avatar: Avatar
  stats: Stats
  progress: Progress
  level: number
  status: Status
  steam_url: string
}

export type Team = {
  id: number
  name: string
  score: number
  players: Player[]
  match_id: number
}

export type MatchStatus = 'warmup' | 'running' | 'cancelled' | 'loading'

export type Match = {
  id: number
  map: Map
  create_date: Date
  start_date: string
  end_date: string | null
  status: string
  game_type: string
  game_mode: number
  server_ip: string
  teams: Team[]
  rounds: number
  winner_id: number
}

type MatchState = {
  match: Match | null
}

const initialState: MatchState = {
  match: null,
}

export const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    updateMatch: (state, action) => {
      state.match = action.payload
      return state
    },

    cancelMatch: (state) => {
      if (!state.match) return

      return {
        match: { ...state.match, status: 'cancelled' },
      }
    },
  },
})

export const { updateMatch, cancelMatch } = matchSlice.actions

export default matchSlice.reducer
