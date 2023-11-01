import { redirect } from 'next/navigation'

import { LatestMatchesResult } from '@/store/slices/lobbySlice'
import { Stats } from '@/store/slices/matchSlice'
import { Avatar, Status } from '@/store/slices/userSlice'

import { profilesApi } from '@/modelsApi'

import { userAuthToken } from '@/middleware'

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
}

export async function getUserProfile(
  userId: number,
  userAuth: userAuthToken
): Promise<Profile> {
  const response = await profilesApi.detail(userAuth.token, userId, {
    next: { tags: ['profile'] },
  })

  if (response.errorMsg) return redirect('/not-found')

  return response
}
