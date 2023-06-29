import { BaseAPI } from './Base'

export const PreMatchesAPI = {
  async playerLockIn(token) {
    return await BaseAPI.create('pre-matches/lock-in/', token)
  },

  async playerReady(token) {
    return await BaseAPI.create('pre-matches/ready/', token)
  },

  async detail(token) {
    return await BaseAPI.detail('pre-matches/', token)
  },
}

export default PreMatchesAPI
