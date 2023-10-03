import { baseApi } from './baseApi'

export const notificationsApi = {
  async list(token: string) {
    return await baseApi.list('notifications/', token)
  },

  async detail(token: string, id: number) {
    return await baseApi.detail(`notifications/${id}/`, token)
  },

  async read(token: string, id: number) {
    const payload = { read_date: new Date() }
    return await baseApi.update(`notifications/${id}/`, token, payload)
  },

  async readAll(token: string) {
    const payload = { read_date: new Date() }
    return await baseApi.update(`notifications/read-all/`, token, payload)
  },
}
