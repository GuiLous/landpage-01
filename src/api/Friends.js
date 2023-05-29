import { BaseAPI } from './Base'

export const FriendsAPI = {
  async list(token) {
    // we soon should have friends endpoints and there will be
    // no need to fetch from user redux state
    // https://github.com/3C-gg/reload-backend/issues/402
    return await BaseAPI.list('friends/', token)
  },
}

export default FriendsAPI
