import { BaseAPI } from './Base'

export const SupportAPI = {
  async listTickets(token) {
    return await BaseAPI.list('support/tickets/subjects/', token)
  },

  async createTicket(token, payload) {
    return await BaseAPI.create(
      'support/tickets/',
      token,
      payload,
      'multipart/form-data'
    )
  },
}

export default SupportAPI
