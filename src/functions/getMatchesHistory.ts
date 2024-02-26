'use server'

import { getAuthServer } from '@/utils'

import { GameType, MatchStatus } from '@/store/matchStore'

import { matchesApi } from '@/modelsApi'

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
  game_mode: GameType
  start_date: string
  end_date: string | null
  won: boolean
  score: string
  stats: StatsMatchProfileType
  status?: MatchStatus
}

export interface MatchHistory {
  results: MatchProfileType[]
  count: number
  page_size: number
  total_pages: number
  prev_page: any
  current_page: number
  next_page: any
}

export async function getMatchesHistory(
  userId: number,
  page: number
): Promise<MatchHistory> {
  const auth = getAuthServer()

  const response = await matchesApi.list(auth.token, userId, page, {
    next: { revalidate: 600 },
  })

  return response
}
