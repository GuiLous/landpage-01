import { baseApi } from './baseApi'

export const accountsApi = {
  async logout(token: string) {
    return await baseApi.update('accounts/logout/', token)
  },

  async updateEmail(token: string, email: string) {
    const payload = { email }
    return await baseApi.update('accounts/update-email/', token, payload)
  },

  async inactivate(token: string) {
    const payload = { is_active: false }
    return await baseApi.update('accounts/inactivate/', token, payload)
  },

  async delete(token: string) {
    return await baseApi.delete('accounts/', token)
  },
}
