import { baseApi } from './baseApi'

export const notificationsApi = {
  async list(token: string, options?: RequestInit) {
    return await baseApi.list({ endpoint: 'notifications/', token, options })
  },

  async detail(token: string, id: number, options?: RequestInit) {
    return await baseApi.detail({
      endpoint: `notifications/${id}/`,
      token,
      options,
    })
  },

  async read(token: string, id: number, options?: RequestInit) {
    const payload = { read_date: new Date() }
    return await baseApi.update({
      endpoint: `notifications/${id}/`,
      token,
      payload,
      options,
    })
  },

  async readAll(token: string, options?: RequestInit) {
    const payload = { read_date: new Date() }
    return await baseApi.update({
      endpoint: `notifications/read-all/`,
      token,
      payload,
      options,
    })
  },
}
