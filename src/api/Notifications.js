import { BaseAPI } from './Base'

export const NotificationsAPI = {
  async list(token) {
    return await BaseAPI.list('notifications/', token)
  },

  async detail(token, id) {
    return await BaseAPI.get(`notifications/${id}/`, token)
  },

  async read(token, id) {
    const payload = { read_date: new Date() }
    return await BaseAPI.update(`notifications/${id}/`, token, payload)
  },

  async readAll(token) {
    const payload = { read_date: new Date() }
    return await BaseAPI.update(`notifications/read-all/`, token, payload)
  },
}

export default NotificationsAPI
