import { BaseAPI } from './Base'

export const LobbiesAPI = {
  async listReceivedInvites(token) {
    return await BaseAPI.list('lobbies/invites/?received=true', token)
  },

  async refuseInvite(token, inviteId) {
    return await BaseAPI.delete(`lobbies/invites/${inviteId}/`, token, {
      refuse: true,
    })
  },

  async acceptInvite(token, inviteId) {
    return await BaseAPI.delete(`lobbies/invites/${inviteId}/`, token, {
      accept: true,
    })
  },

  async createInvite(token, lobbyId, fromUserId, toUserId) {
    return await BaseAPI.create('lobbies/invites/', token, {
      lobby_id: lobbyId,
      from_user_id: fromUserId,
      to_user_id: toUserId,
    })
  },

  async removePlayer(token, lobbyId, playerId) {
    return await BaseAPI.delete(
      `lobbies/${lobbyId}/players/${playerId}/`,
      token
    )
  },

  async detail(token, lobbyId) {
    return await BaseAPI.detail(`/lobbies/${lobbyId}/`, token)
  },

  async startQueue(token, lobbyId) {
    return await BaseAPI.update(`/lobbies/${lobbyId}/`, token, {
      start_queue: true,
      cancel_queue: false,
    })
  },

  async cancelQueue(token, lobbyId) {
    return await BaseAPI.update(`/lobbies/${lobbyId}/`, token, {
      start_queue: false,
      cancel_queue: true,
    })
  },
}

export default LobbiesAPI
