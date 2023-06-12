import { BaseAPI } from './Base'

export const SupportAPI = {
  async listTickets(token) {
    return await BaseAPI.list('support/tickets/subjects/', token)
  },

  async createTicket(token, form) {
    return await BaseAPI.create('support/tickets/', token, form)
  },
}

export default SupportAPI
