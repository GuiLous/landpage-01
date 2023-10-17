import { baseApi } from './baseApi'

export const matchesApi = {
  async detail(token: string, match_id: number, options?: RequestInit) {
    return await baseApi.detail({
      endpoint: `matches/${match_id}/`,
      token,
      options,
    })
  },

  async list(token: string, user_id: number, page = 1, options?: RequestInit) {
    return await baseApi.list({
      endpoint: `matches/?user_id=${user_id}&page=${page}`,
      token,
      options,
    })
  },
}
