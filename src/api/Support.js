import { BaseAPI } from './Base'

export const SupportAPI = {
  async createTicket(token, form) {
    return await BaseAPI.create('support/ticket/', token, form)
  },
}

export default SupportAPI
