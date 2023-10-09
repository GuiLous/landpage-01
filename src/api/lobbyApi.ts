import { baseApi } from './baseApi'

export const lobbyApi = {
  async listReceivedInvites(token: string) {
    return await baseApi.list('lobbies/invites/?received=true', token)
  },

  async listInvites(token: string) {
    return await baseApi.list('lobbies/invites/', token)
  },

  async refuseInvite(token: string, inviteId: string) {
    return await baseApi.delete(`lobbies/invites/${inviteId}/`, token, {
      refuse: true,
    })
  },

  async acceptInvite(token: string, inviteId: string) {
    return await baseApi.delete(`lobbies/invites/${inviteId}/`, token, {
      accept: true,
    })
  },

  async createInvite(
    token: string,
    lobbyId: number,
    fromUserId: number,
    toUserId: number
  ) {
    return await baseApi.create('lobbies/invites/', token, {
      lobby_id: lobbyId,
      from_user_id: fromUserId,
      to_user_id: toUserId,
    })
  },

  async removePlayer(token: string, lobbyId: number, playerId: number) {
    return await baseApi.delete(
      `lobbies/${lobbyId}/players/${playerId}/`,
      token
    )
  },

  async detail(token: string, lobbyId: number) {
    return await baseApi.detail(`/lobbies/${lobbyId}/`, token)
  },

  async startQueue(token: string, lobbyId: number) {
    return await baseApi.update(`/lobbies/${lobbyId}/`, token, {
      start_queue: true,
      cancel_queue: false,
    })
  },

  async cancelQueue(token: string, lobbyId: number) {
    return await baseApi.update(`/lobbies/${lobbyId}/`, token, {
      start_queue: false,
      cancel_queue: true,
    })
  },
}
