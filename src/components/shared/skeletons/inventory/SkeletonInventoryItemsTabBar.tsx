import { twMerge } from 'tailwind-merge'

import { Skeleton } from '@/components/shared'

export function SkeletonInventoryItemsTabBar() {
  return (
    <div className="flex-initial items-center justify-between">
      <div className={twMerge('max-w-fit gap-6', '3xl:gap-5')}>
        <Skeleton className="min-h-8 min-w-20 max-w-20" />
        <Skeleton className="min-h-8 min-w-20 max-w-20" />
        <Skeleton className="min-h-8 min-w-20 max-w-20" />
      </div>
    </div>
  )
}
