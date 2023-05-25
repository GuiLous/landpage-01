import { BaseAPI } from './Base'

export const AccountsAPI = {
  async logout(token) {
    // the endpoint should move to DELETE 'accounts/sessions/'.
    // https://github.com/3C-gg/reload-backend/issues/401
    return await BaseAPI.update('accounts/logout/', token)
  },

  async listMatches(token, user_id) {
    return await BaseAPI.list(`accounts/${user_id}/matches/`, token)
  },

  async detail(token, user_id) {
    return await BaseAPI.detail(`accounts/profiles/${user_id}/`, token)
  },
}

export default AccountsAPI
