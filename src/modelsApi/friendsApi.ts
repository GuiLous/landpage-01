import { baseApi } from './baseApi'

export const friendsApi = {
  async list(token: string, options?: RequestInit) {
    return await baseApi.list({ endpoint: 'friends/', token, options })
  },
}
