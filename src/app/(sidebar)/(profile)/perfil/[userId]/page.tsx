import { Suspense } from 'react'
import { twMerge } from 'tailwind-merge'

import { profileSteps } from '@/utils'

import {
  ProfileHeaderRender,
  ProfileHeatmapStatsCard,
  ProfileLevelStatsCard,
  ProfileMatchHistoryList,
} from '@/components/pages'

import {
  SkeletonHeatmapStatsCard,
  SkeletonLeveStatsCard,
  SkeletonMatchHistoryList,
  SkeletonProfileHeader,
  Wizard,
} from '@/components/shared'

interface RouteProps {
  params: { userId: string }
  searchParams: { page: string }
}

export default async function Profile({ params, searchParams }: RouteProps) {
  const { userId } = params
  const { page } = searchParams

  return (
    <main className={twMerge('flex-col gap-10 pb-10', '3xl:gap-7 3xl:pb-7')}>
      <Suspense fallback={<SkeletonProfileHeader />}>
        <ProfileHeaderRender userId={Number(userId)} />
        <Wizard steps={profileSteps} page="profile" />
      </Suspense>

      <section
        className={twMerge('flex-initial gap-4 px-[3.750rem]', '3xl:px-7')}
      >
        <div
          className={twMerge(
            'flex-col gap-4 self-start max-w-[350px]',
            '3xl:max-w-[300px]'
          )}
        >
          <Suspense fallback={<SkeletonLeveStatsCard />}>
            <ProfileLevelStatsCard userId={Number(userId)} />
          </Suspense>

          <Suspense fallback={<SkeletonHeatmapStatsCard />}>
            <ProfileHeatmapStatsCard userId={Number(userId)} />
          </Suspense>
        </div>

        <Suspense fallback={<SkeletonMatchHistoryList />}>
          <ProfileMatchHistoryList
            userId={Number(userId)}
            page={page ? Number(page) : 1}
          />
        </Suspense>
      </section>
    </main>
  )
}
