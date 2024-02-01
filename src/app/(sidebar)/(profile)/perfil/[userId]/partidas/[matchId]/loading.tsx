import { twMerge } from 'tailwind-merge'

import {
  Skeleton,
  SkeletonMatchDetailsHeader,
  SkeletonMatchStatsTable,
} from '@/components/shared'

export default function loading() {
  return (
    <main className={twMerge('flex-col gap-7 py-10 px-[4%]', '3xl:gap-6')}>
      <SkeletonMatchDetailsHeader />

      <div
        className={twMerge(
          'flex-col gap-6 flex-initial bg-gray-1100 rounded-lg p-6',
          '3xl:gap-5'
        )}
      >
        <section
          className={twMerge('gap-6 flex-initial', '3xl:gap-5 3xl:flex-col')}
        >
          <Skeleton className="h-[82px] max-w-full" />

          <div
            className={twMerge(
              'min-h-[82px] min-w-[38%] max-w-fit items-center rounded bg-gray-800/80',
              '3xl:max-w-full'
            )}
          >
            <Skeleton className="h-[82px] max-w-full" />
          </div>
        </section>

        <SkeletonMatchStatsTable />

        <SkeletonMatchStatsTable />
      </div>
    </main>
  )
}
