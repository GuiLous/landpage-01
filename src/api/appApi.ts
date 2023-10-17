import { baseApi } from './baseApi'

export const appApi = {
  async healthCheck(token: string, options?: RequestInit) {
    return await baseApi.list({ endpoint: '/', token, options })
  },
}

export default appApi
