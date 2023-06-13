import { BaseAPI } from './Base'

export const MatchmakingAPI = {
  async lobbyInvite(token, lobbyId, userId) {
    return await BaseAPI.create(
      `mm/lobby/${lobbyId}/invite-player/${userId}/`,
      token
    )
  },

  async playerLockIn(token, matchId) {
    return await BaseAPI.update(`/mm/match/${matchId}/player-lock-in/`, token)
  },
}

export default MatchmakingAPI
