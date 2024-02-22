import { WeaponIndexType } from '@/utils'

import { MatchType } from '@/store/lobbyStore'
import { GameType } from '@/store/matchStore'

import { baseApi } from './baseApi'

export type PlayerSide =
  | 'def_players_ids'
  | 'atk_players_ids'
  | 'spec_players_ids'

type QueueOptionsType = {
  match_type: MatchType
  map_id: number
  weapon?: WeaponIndexType
}

export const lobbyApi = {
  async listReceivedInvites(token: string, options?: RequestInit) {
    return await baseApi.list({
      endpoint: 'lobbies/invites/?received=true',
      token,
      options,
    })
  },

  async listInvites(token: string, options?: RequestInit) {
    return await baseApi.list({ endpoint: 'lobbies/invites/', token, options })
  },

  async refuseInvite(token: string, inviteId: string, options?: RequestInit) {
    return await baseApi.delete({
      endpoint: `lobbies/invites/${inviteId}/`,
      token,
      payload: {
        refuse: true,
      },
      options,
    })
  },

  async acceptInvite(token: string, inviteId: string, options?: RequestInit) {
    return await baseApi.delete({
      endpoint: `lobbies/invites/${inviteId}/`,
      token,
      payload: {
        accept: true,
      },
      options,
    })
  },

  async createInvite(
    token: string,
    lobbyId: number,
    fromUserId: number,
    toUserId: number,
    options?: RequestInit
  ) {
    return await baseApi.create({
      endpoint: 'lobbies/invites/',
      token,
      payload: {
        lobby_id: lobbyId,
        from_user_id: fromUserId,
        to_user_id: toUserId,
      },
      options,
    })
  },

  async removePlayer(
    token: string,
    lobbyId: number,
    playerId: number,
    options?: RequestInit
  ) {
    return await baseApi.delete({
      endpoint: `lobbies/${lobbyId}/players/${playerId}/`,
      token,
      options,
    })
  },

  async detail(token: string, lobbyId: number, options?: RequestInit) {
    return await baseApi.detail({
      endpoint: `lobbies/${lobbyId}/`,
      token,
      options,
    })
  },

  async startQueue(token: string, lobbyId: number, options?: RequestInit) {
    return await baseApi.update({
      endpoint: `lobbies/${lobbyId}/`,
      token,
      payload: {
        queue: 'start',
      },
      options,
    })
  },

  async cancelQueue(token: string, lobbyId: number, options?: RequestInit) {
    return await baseApi.update({
      endpoint: `lobbies/${lobbyId}/`,
      token,
      payload: {
        queue: 'stop',
      },
      options,
    })
  },

  async switchMode(
    token: string,
    lobbyId: number,
    mode: GameType,
    options?: RequestInit
  ) {
    return await baseApi.update({
      endpoint: `lobbies/${lobbyId}/`,
      token,
      payload: {
        mode,
      },
      options,
    })
  },

  async switchPlayerSeat(
    token: string,
    lobbyId: number,
    player_id: number,
    side: PlayerSide,
    options?: RequestInit
  ) {
    return await baseApi.update({
      endpoint: `/lobbies/${lobbyId}/players/`,
      token,
      payload: {
        player_id,
        side,
      },
      options,
    })
  },

  async updateQueueOptions(
    token: string,
    lobbyId: number,
    queueOptions: QueueOptionsType,
    options?: RequestInit
  ) {
    return await baseApi.update({
      endpoint: `lobbies/${lobbyId}/`,
      token,
      payload: queueOptions,
      options,
    })
  },
}
