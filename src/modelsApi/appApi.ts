import { baseApi } from './baseApi'

export const appApi = {
  async healthCheck(options?: RequestInit) {
    return await baseApi.list({ token: null, endpoint: '/', options })
  },
}

export default appApi
