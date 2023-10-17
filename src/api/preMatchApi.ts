import { baseApi } from './baseApi'

export const preMatchApi = {
  async playerLockIn(token: string, options?: RequestInit) {
    return await baseApi.create({
      endpoint: 'pre-matches/lock-in/',
      token,
      options,
    })
  },

  async playerReady(token: string, options?: RequestInit) {
    return await baseApi.create({
      endpoint: 'pre-matches/ready/',
      token,
      options,
    })
  },

  async detail(token: string, options?: RequestInit) {
    return await baseApi.detail({ endpoint: 'pre-matches/', token, options })
  },
}
