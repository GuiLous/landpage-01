import { matchesApi } from '@/modelsApi'

import { userAuthToken } from '@/middleware'

export type StatsMatchProfileType = {
  adr: number
  kdr: number
  kda: string
  head_accuracy: number
  firstkills: number
}

export type MatchProfileType = {
  id: number
  map_name: string
  map_image: any
  game_type: string
  start_date: string
  end_date: string
  won: boolean
  score: string
  stats: StatsMatchProfileType
}

export interface MatchHistoryResponse {
  results: MatchProfileType[]
  count: number
  page_size: number
  total_pages: number
  prev_page: any
  current_page: number
  next_page: any
}

export async function getMatchesHistory(
  userAuth: userAuthToken,
  userId: number,
  page: number
): Promise<MatchHistoryResponse> {
  const response = await matchesApi.list(userAuth.token, userId, page, {
    next: { revalidate: 600 },
  })

  return response
}
