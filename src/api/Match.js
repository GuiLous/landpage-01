import { BaseAPI } from './Base'

export const MatchAPI = {
  async list(token, match_id) {
    return await BaseAPI.get(`matches/${match_id}/`, token)
  },

  async acceptInvite(token, lobby_id, id) {
    return await BaseAPI.patch(`mm/lobby/${lobby_id}/accept-invite/${id}/`, token)
  },

  async refuseInvite(token, lobby_id, id) {
    return await BaseAPI.patch(`mm/lobby/${lobby_id}/refuse-invite/${id}/`, token)
  },

  async toggleVisibility(token, lobby_id, endpoint) {
    return await BaseAPI.patch(`mm/lobby/${lobby_id}/${endpoint}/`, token)
  },

  async leaveLobby(token) {
    return await BaseAPI.patch('mm/lobby/leave', token)
  },

  async removePlayer(token, lobby_id, user_id) {
    return await BaseAPI.patch(`mm/lobby/${lobby_id}/remove-player/${user_id}/`, token)
  },

  async toggleMode(token, lobby_id, lobby_type, lobby_mode) {
    return await BaseAPI.patch(`mm/lobby/${lobby_id}/change-type/${lobby_type}/change-mode/${lobby_mode}`, token)
  },

  async acceptMatch(token, pre_match_id) {
    return await BaseAPI.patch(`mm/match/${pre_match_id}/player-ready/`, token)
  },

  async invitePlayer(token, lobby_id, user_id) {
    return await BaseAPI.post(`mm/lobby/${lobby_id}/invite-player/${user_id}/`, token)
  },

  async playerLockIn(token, pre_match_id) {
    return await BaseAPI.patch(`mm/match/${pre_match_id}/player-lock-in/`, token)
  },

  async startQueue(token, lobby_id) {
    return await BaseAPI.patch(`mm/lobby/${lobby_id}/start-queue/`, token)
  },

  async cancelQueue(token, lobby_id) {
    return await BaseAPI.patch(`mm/lobby/${lobby_id}/cancel-queue/`, token)
  },

}

export default MatchAPI
