import { baseApi } from './baseApi'

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
      endpoint: `/lobbies/${lobbyId}/`,
      token,
      options,
    })
  },

  async startQueue(token: string, lobbyId: number, options?: RequestInit) {
    return await baseApi.update({
      endpoint: `/lobbies/${lobbyId}/`,
      token,
      payload: {
        start_queue: true,
        cancel_queue: false,
      },
      options,
    })
  },

  async cancelQueue(token: string, lobbyId: number, options?: RequestInit) {
    return await baseApi.update({
      endpoint: `/lobbies/${lobbyId}/`,
      token,
      payload: {
        start_queue: false,
        cancel_queue: true,
      },
      options,
    })
  },
}
