import { redirect } from 'next/navigation'

import { getAuthServer } from '@/utils'

import { LatestMatchesResult } from '@/store/lobbyStore'
import { Stats } from '@/store/matchStore'
import { Avatar, Status } from '@/store/userStore'

import { profilesApi } from '@/modelsApi'

export type SocialHandles = {
  steam: string | null
  twitch?: string | null
  discord?: string | null
  youtube?: string | null
}

export type Profile = {
  username: string
  level: number
  level_points: number
  highest_level: number
  social_handles: SocialHandles
  user_id: number
  avatar: Avatar
  matches_played: number
  matches_won: number
  highest_win_streak: number
  latest_matches_results: LatestMatchesResult[]
  most_kills_in_a_match?: number
  most_damage_in_a_match?: number
  stats: Stats
  date_joined: string
  status: Status
  header: string | null
}

export async function getUserProfile(userId: number): Promise<Profile> {
  const auth = getAuthServer()

  const response = await profilesApi.detail(auth.token, userId, {
    next: { tags: ['profile'] },
  })

  if (response.errorMsg) return redirect('/not-found')

  return response
}
