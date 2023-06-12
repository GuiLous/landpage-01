import { BaseAPI } from './Base'

export const LobbiesAPI = {
  async listReceivedInvites(token) {
    return await BaseAPI.list('lobbies/invites/?received=true', token)
  },

  async refuseInvite(token, invite_id) {
    return await BaseAPI.delete(`lobbies/invites/${invite_id}/`, token, {
      refuse: true,
    })
  },

  async acceptInvite(token, invite_id) {
    return await BaseAPI.delete(`lobbies/invites/${invite_id}/`, token, {
      accept: true,
    })
  },

  async createInvite(token, lobby_id, from_user_id, to_user_id) {
    return await BaseAPI.create('lobbies/invites/', token, {
      lobby_id: lobby_id,
      from_user_id: from_user_id,
      to_user_id: to_user_id,
    })
  },

  async removePlayer(token, lobby_id, player_id) {
    return await BaseAPI.delete(
      `lobbies/${lobby_id}/players/${player_id}/`,
      token
    )
  },
}

export default LobbiesAPI
