import { baseApi } from './baseApi'

export const friendsApi = {
  async list(token: string, options?: RequestInit) {
    return await baseApi.list({ endpoint: 'friends/', token, options })
  },

  async add(token: string, username: string, options?: RequestInit) {
    return await baseApi.create({
      endpoint: `friends/${username}/`,
      token,
      options,
    })
  },

  async remove(token: string, user_id: number, options?: RequestInit) {
    return await baseApi.delete({
      endpoint: `friends/${user_id}/`,
      token,
      options,
    })
  },

  async accept(token: string, request_id: number, options?: RequestInit) {
    return await baseApi.create({
      endpoint: `friends/requests/${request_id}/`,
      token,
      options,
    })
  },

  async refuse(token: string, request_id: number, options?: RequestInit) {
    return await baseApi.delete({
      endpoint: `friends/requests/${request_id}/`,
      token,
      options,
    })
  },

  async searchFriends(token: string, username: string, options?: RequestInit) {
    return await baseApi.delete({
      endpoint: `friends/search/${username}/`,
      token,
      options,
    })
  },
}
