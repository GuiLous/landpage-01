import { redirect } from 'next/navigation'

import { getAuthServer } from '@/utils'

import { rankingApi } from '@/modelsApi'

import { Profile } from './getUserProfile'

export type PlayerRanking = Profile & { ranking_pos: number }

export type ranking = {
  results: PlayerRanking[]
  count: number
  page_size: number
  total_pages: number
  prev_page: any
  current_page: number
  next_page: any
}

interface getRankingProps {
  page?: number
}

export async function getRanking({
  page = 1,
}: getRankingProps): Promise<ranking> {
  const auth = await getAuthServer()

  const response = await rankingApi.listRanking(auth.token, page, {
    next: { revalidate: 300, tags: ['ranking'] },
  })

  if (response.errorMsg) return redirect('/not-found')

  return response
}
