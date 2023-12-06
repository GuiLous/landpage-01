import { baseApi } from './baseApi'

export const accountsApi = {
  async logout(token: string, options?: RequestInit) {
    return await baseApi.update({
      endpoint: 'accounts/logout/',
      token,
      options,
    })
  },

  async updateEmail(token: string, email: string, options?: RequestInit) {
    const payload = { email }
    return await baseApi.update({
      endpoint: 'accounts/update-email/',
      token,
      payload,
      options,
    })
  },

  async inactivate(token: string, options?: RequestInit) {
    const payload = { is_active: false }
    return await baseApi.update({
      endpoint: 'accounts/inactivate/',
      token,
      payload,
      options,
    })
  },

  async delete(token: string, options?: RequestInit) {
    return await baseApi.delete({ endpoint: 'accounts/', token, options })
  },

  async syncUser(token: string, options?: RequestInit) {
    return await baseApi.create({
      endpoint: 'accounts/steam-sync/',
      token,
      options,
    })
  },

  async createInvite(token: string, email: string, options?: RequestInit) {
    const payload = { email }
    return await baseApi.create({
      endpoint: 'accounts/invites/',
      token,
      payload,
      options,
    })
  },
}
