import { BaseAPI } from './Base'

export const AccountsAPI = {
  async logout(token) {
    // the endpoint should move to DELETE 'accounts/sessions/'.
    // https://github.com/3C-gg/reload-backend/issues/401
    return await BaseAPI.update('accounts/logout/', token)
  },

  async updateEmail(token, email) {
    const payload = { email: email }
    return await BaseAPI.update('accounts/update-email/', token, payload)
  },

  async updateIsActive(token, is_active) {
    const payload = { is_active: is_active }
    return await BaseAPI.update('accounts/', token, payload)
  },
}

export default AccountsAPI
