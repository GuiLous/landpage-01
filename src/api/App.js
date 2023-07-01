import { BaseAPI } from './Base'

export const AppAPI = {
  async healthCheck(token) {
    return await BaseAPI.list('/', token)
  },
}

export default AppAPI
