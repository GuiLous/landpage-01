import { twMerge } from 'tailwind-merge'

import { Skeleton } from '@/components/shared'

export function SkeletonLineupCustomSeat() {
  return (
    <Skeleton
      className={twMerge(
        'flex max-h-16 max-w-full transition-colors flex-1 items-center justify-center bg-gray-500/60',
        'group',
        'last:rounded-b',
        'ultrawide:max-h-28'
      )}
    />
  )
}
