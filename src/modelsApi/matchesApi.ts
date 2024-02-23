import { baseApi } from './baseApi'

export type CreateMatchPayloadType = {
  players_ids: number[]
  mode: string
  mapId: number
  weapon?: string
  defPlayersIds: number[]
  atkPlayersIds: number[]
  specPlayersIds: number[]
}

export const matchesApi = {
  async detail(token: string, match_id: number, options?: RequestInit) {
    return await baseApi.detail({
      endpoint: `matches/${match_id}/`,
      token,
      options,
    })
  },

  async list(token: string, user_id: number, page = 1, options?: RequestInit) {
    return await baseApi.list({
      endpoint: `matches/?user_id=${user_id}&page=${page}`,
      token,
      options,
    })
  },

  async create(
    token: string,
    payload: CreateMatchPayloadType,
    options?: RequestInit
  ) {
    return await baseApi.create({
      endpoint: `matches/`,
      token,
      payload,
      options,
    })
  },
}
