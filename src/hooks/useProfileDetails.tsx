'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { LatestMatchesResult } from '@/store/slices/lobbySlice'
import { Stats } from '@/store/slices/matchSlice'
import { Avatar, Status } from '@/store/slices/userSlice'

import { profilesApi } from '@/api'

import { useAuth } from './useAuth'

export type SocialHandles = {
  steam: string
  twitch?: string
  discord?: string
  youtube?: string
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

export const useProfileDetails = () => {
  const router = useRouter()

  const getAuth = useAuth()
  const auth = getAuth()

  const [fetching, setFetching] = useState(true)
  const [profile, setProfile] = useState<Profile>({} as Profile)

  const getProfileDetails = useCallback(
    async (userId: number, showLoading = true) => {
      if (!auth?.token) return

      showLoading && setFetching(true)

      const response = await profilesApi.detail(auth.token, userId)
      if (response.errorMsg) {
        router.push('/404')
      }

      setProfile(response)
      setFetching(false)
    },
    [auth, router]
  )

  return { fetching, profile, getProfileDetails }
}
