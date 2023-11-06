import { redirect } from 'next/navigation'

import { getAuthServer } from '@/utils'

import { Match } from '@/store/slices/matchSlice'

import { matchesApi } from '@/modelsApi'

export async function getMatchDetails(matchId: number): Promise<Match> {
  const auth = getAuthServer()

  const response = await matchesApi.detail(auth.token, matchId, {
    cache: 'no-cache',
  })

  if (response.errorMsg) return redirect('/not-found')

  return response
}
