import { baseApi } from './baseApi'

export const profilesApi = {
  async detail(token: string, user_id: number, options?: RequestInit) {
    return await baseApi.detail({
      endpoint: `profiles/?user_id=${user_id}`,
      token,
      options,
    })
  },

  async updateSocials(token: string, payload: any, options?: RequestInit) {
    return await baseApi.update({
      endpoint: 'profiles/',
      token,
      payload,
      options,
    })
  },
}
