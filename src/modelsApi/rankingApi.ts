import { baseApi } from './baseApi'

export const rankingApi = {
  async listRanking(token: string, page: number, options?: RequestInit) {
    return await baseApi.detail({
      endpoint: `ranking/?page=${page}`,
      token,
      options,
    })
  },
}
