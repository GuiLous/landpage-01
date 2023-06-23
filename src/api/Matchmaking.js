import { BaseAPI } from './Base'

export const MatchmakingAPI = {
  async playerLockIn(token, matchId) {
    return await BaseAPI.update(`/mm/match/${matchId}/player-lock-in/`, token)
  },

  async playerReady(token, matchId) {
    return await BaseAPI.update(`/mm/match/${matchId}/player-ready/`, token)
  },
}

export default MatchmakingAPI
