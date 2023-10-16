import { baseApi } from './baseApi'

export const preMatchApi = {
  async playerLockIn(token: string) {
    return await baseApi.create('pre-matches/lock-in/', token)
  },

  async playerReady(token: string) {
    return await baseApi.create('pre-matches/ready/', token)
  },

  async detail(token: string) {
    return await baseApi.detail('pre-matches/', token)
  },
}
