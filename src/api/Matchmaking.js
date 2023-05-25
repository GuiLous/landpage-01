import { BaseAPI } from './Base'

export const MatchmakingAPI = {
  async lobbyInvite(token, lobbyId, userId) {
    return await BaseAPI.create(
      `mm/lobby/${lobbyId}/invite-player/${userId}/`,
      token
    )
  },
}

export default MatchmakingAPI
