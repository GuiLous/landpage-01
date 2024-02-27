import zukeeper from 'zukeeper'
import { create } from 'zustand'

import { WeaponIndexType } from '@/utils'

import { Friend } from './friendStore'
import { InviteElement } from './invitesStore'
import { GameType, Map } from './matchStore'
import { Avatar, Status } from './userStore'

export type LatestMatchesResult = 'D' | 'N/A' | 'V'

export type MatchType = 'default' | 'safezone' | 'deathmatch'

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
  lobby_match_type: 'string'
  weapon?: WeaponIndexType
  def_players: Friend[]
  atk_players: Friend[]
  spec_players: Friend[]
  map_id: number
  mode: GameType
  match_type_choices: string[]
  weapon_choices: string[]
  map_choices: Map[]
  match_type: MatchType
}

type LobbyStore = {
  lobby: Lobby | null
  updateLobby: (lobby: Lobby | null) => void
  updateQueueTime: (queue_time: number | null) => void
}

export const useLobbyStore = create<LobbyStore>(
  zukeeper((set: any) => ({
    lobby: null,
    updateLobby: (lobby: Lobby | null) =>
      set(() => ({
        lobby,
      })),
    updateQueueTime: (queue_time: number | null) =>
      set((state: LobbyStore) => ({
        lobby: state.lobby && {
          ...state.lobby,
          queue_time,
        },
      })),
  }))
)
