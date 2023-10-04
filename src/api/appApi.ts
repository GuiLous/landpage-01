import { baseApi } from './baseApi'

export const appApi = {
  async healthCheck(token: string) {
    return await baseApi.list('/', token)
  },
}

export default appApi
