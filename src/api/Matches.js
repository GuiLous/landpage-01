import { BaseAPI } from './Base'

export const MatchesAPI = {
  async detail(token, match_id) {
    return await BaseAPI.detail(`matches/${match_id}/`, token)
  },

  async listMatches(token, user_id) {
    return await BaseAPI.list(`accounts/${user_id}/matches/`, token)
  },
}

export default MatchesAPI
