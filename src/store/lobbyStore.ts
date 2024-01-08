import { create } from 'zustand'

import { Friend } from './friendStore'
import { InviteElement } from './invitesStore'
import { Avatar, Status } from './userStore'

export type LatestMatchesResult = 'D' | 'N/A' | 'V'

export type Player = {
  level: number
  username: string
  user_id: number
  avatar: Avatar
  matches_played: number
  latest_matches_results: LatestMatchesResult[]
  steam_url: string
  status: Status
}

export type Lobby = {
  id: number
  owner_id: number
  players_ids: number[]
  players?: Friend[]
  invites?: InviteElement[]
  invited_players_ids: number[]
  seats: number
  queue: Date | null
  queue_time: number | null
  restriction_countdown: number | null
}

type LobbyStore = {
  lobby: Lobby | null
  updateLobby: (lobby: Lobby | null) => void
  updateQueueTime: (queue_time: number | null) => void
}

export const useLobbyStore = create<LobbyStore>((set) => ({
  lobby: null,
  updateLobby: (lobby: Lobby | null) =>
    set(() => ({
      lobby,
    })),
  updateQueueTime: (queue_time: number | null) =>
    set((state) => ({
      lobby: state.lobby && {
        ...state.lobby,
        queue_time,
      },
    })),
}))
