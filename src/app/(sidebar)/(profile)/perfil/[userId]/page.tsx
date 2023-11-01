import { Suspense } from 'react'
import { twMerge } from 'tailwind-merge'

import { getAuthServer } from '@/utils'

import { getUserProfile } from '@/functions'

import {
  ProfileHeatmapStatsCard,
  ProfileLevelStatsCard,
  ProfileMatchHistoryList,
} from '@/components/pages'

import { ProfileHeader, ProfileHeaderTabsButtons } from '@/components/shared'

interface ProfileProps {
  params: { userId: string }
  searchParams: { page: string }
}

export default async function Profile({ params, searchParams }: ProfileProps) {
  const auth = getAuthServer()

  const { userId } = params
  const { page } = searchParams

  const profile = await getUserProfile(Number(userId), auth)

  const isUserLogged = Number(userId) === auth?.id

  return (
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

          <ProfileHeatmapStatsCard
            head_shots={profile.stats.head_shots || 0}
            chest_shots={profile.stats.chest_shots || 0}
            other_shots={profile.stats.other_shots || 0}
          />
        </div>

        <Suspense fallback={<div>loading...</div>}>
          <ProfileMatchHistoryList
            userId={Number(userId)}
            username={profile.username}
            page={page ? Number(page) : 1}
          />
        </Suspense>
      </aside>
    </main>
  )
}
