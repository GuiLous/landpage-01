import { twMerge } from 'tailwind-merge'

import { Skeleton, SkeletonLineupCustomMap } from '@/components/shared'

export function SkeletonLineupCustomFilters() {
  return (
    <div className="grid flex-initial grid-cols-3 gap-x-6 gap-y-4">
      <SkeletonLineupCustomMap />

      {Array.from(Array(3)).map((_, index) => (
        <Skeleton
          key={index}
          className={twMerge(
            'min-h-[38px] max-w-full max-h-[38px] rounded',
            'ultrawide:max-h-[54px] ultrawide:min-h-[54px]'
          )}
        />
      ))}
    </div>
  )
}
