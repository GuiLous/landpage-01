import { BaseAPI } from './Base'

export const MatchesAPI = {
  async detail(token, match_id) {
    return await BaseAPI.detail(`matches/${match_id}/`, token)
  },

  async list(token, user_id) {
    return await BaseAPI.list(`matches?user_id=${user_id}`, token)
  },
}

export default MatchesAPI
