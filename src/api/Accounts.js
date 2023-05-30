import { BaseAPI } from './Base'

export const AccountsAPI = {
  async logout(token) {
    // the endpoint should move to DELETE 'accounts/sessions/'.
    // https://github.com/3C-gg/reload-backend/issues/401
    return await BaseAPI.update('accounts/logout/', token)
  },

  async update(token, email) {
    const payload = { email: email }
    return await BaseAPI.update('accounts/update-email/', token, payload)
  },
}

export default AccountsAPI
