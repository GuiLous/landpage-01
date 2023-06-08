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
}

export default LobbiesAPI
