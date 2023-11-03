import { baseApi } from './baseApi'

export const supportApi = {
  async listTickets(token: string, options?: RequestInit) {
    return await baseApi.list({
      endpoint: 'support/tickets/subjects/',
      token,
      options,
    })
  },

  async createTicket(token: string, payload: any, options?: RequestInit) {
    return await baseApi.create({
      endpoint: 'support/tickets/',
      token,
      payload,
      headers_content_type: 'multipart/form-data',
      options,
    })
  },
}
