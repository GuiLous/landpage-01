import { baseApi } from './baseApi'

export const supportApi = {
  async listTickets(token: string) {
    return await baseApi.list('support/tickets/subjects/', token)
  },

  async createTicket(token: string, payload: any) {
    return await baseApi.create(
      'support/tickets/',
      token,
      payload,
      'multipart/form-data'
    )
  },
}
