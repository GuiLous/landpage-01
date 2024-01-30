import { twMerge } from 'tailwind-merge'

import { Skeleton } from '../../Skeleton'

interface SkeletonHeatmapStatsCardStatItemProps {
  name: string
}

export function SkeletonHeatmapStatsCardStatItem({
  name,
}: SkeletonHeatmapStatsCardStatItemProps) {
  return (
    <div className="flex-initial items-center justify-between">
      <div className="max-w-fit flex-initial flex-col justify-between gap-1.5">
        <span
          className={twMerge(
            'text-xs font-medium uppercase text-gray-300',
            'leading-none'
          )}
        >
          {name}
        </span>

        <span
          className={twMerge(
            'font-bold text-white leading-none',
            '3xl:text-sm'
          )}
        >
          <Skeleton className="min-h-4 min-w-12" />
        </span>
      </div>

      <div className="max-w-fit flex-initial flex-col gap-1">
        <span
          className={twMerge(
            'font-bold text-white leading-none',
            '3xl:text-sm'
          )}
        >
          <Skeleton className="min-h-2 min-w-12" />
        </span>

        <span
          className={twMerge(
            'text-xs font-medium text-gray-300',
            'leading-none'
          )}
        >
          ACERTOS
        </span>
      </div>
    </div>
  )
}
