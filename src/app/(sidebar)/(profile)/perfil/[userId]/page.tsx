'use client'

import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

import { useProfileDetails } from '@/contexts'

import { useAppSelector } from '@/store'

import { ProfileLevelStatsCard } from '@/components/pages'

import {
  Loading,
  ProfileHeader,
  ProfileHeaderTabsButtons,
} from '@/components/shared'

interface ProfileProps {
  params: { userId: string }
}

export default function Profile({ params }: ProfileProps) {
  const { user } = useAppSelector((state) => state.user)
  const { userId } = params

  const { fetching, profile, getProfileDetails } = useProfileDetails()

  const isUserLogged = Number(userId) === user?.id

  useEffect(() => {
    getProfileDetails(Number(userId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  return fetching ? (
    <Loading.Overlay>
      <Loading.Gif />
    </Loading.Overlay>
  ) : (
    <main className={twMerge('flex-col gap-10', '3xl:gap-[1.875rem]')}>
      <ProfileHeader isUserLogged={isUserLogged} profile={profile}>
        <ProfileHeaderTabsButtons
          isUserLogged={isUserLogged}
          userId={Number(userId)}
          username={profile.username}
        />
      </ProfileHeader>

      <aside
        className={twMerge(
          'flex-initial gap-4 px-[3.750rem]',
          '3xl:px-[1.875rem]'
        )}
      >
        <div
          className={twMerge(
            'flex-col gap-4 self-start max-w-[350px]',
            '3xl:max-w-[300px]'
          )}
        >
          <ProfileLevelStatsCard
            level={profile.level}
            highest_level={profile.highest_level}
            matches_won={profile.matches_won}
            highest_win_streak={profile.highest_win_streak}
            latest_matches_results={profile.latest_matches_results}
            most_kills_in_a_match={profile.most_kills_in_a_match}
            most_damage_in_a_match={profile.most_damage_in_a_match}
            stats={profile.stats}
          />
          <div>HeatMap</div>
        </div>

        <div>MatchHistory</div>
      </aside>
    </main>
  )
}
