import { twMerge } from 'tailwind-merge'

import { Skeleton } from '@/components/shared'

export function SkeletonInventorySubItemTab() {
  return (
    <div
      className={twMerge(
        'min-h-[38px] w-full max-w-[364px] flex-initial items-center gap-2 overflow-hidden',
        '3xl:max-w-[355px] 3xl:gap-1.5'
      )}
    >
      {Array.from(Array(3)).map((_, index) => (
        <Skeleton key={index} className="min-h-[38px] min-w-28" />
      ))}
    </div>
  )
}
