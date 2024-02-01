import { twMerge } from 'tailwind-merge'

import { Skeleton } from '@/components/shared'

export function SkeletonWeaponSelectList() {
  return (
    <div className={twMerge('flex-col gap-4', '3xl:gap-2.5')}>
      {Array.from(Array(2)).map((_, index) => (
        <div
          key={index}
          className={twMerge('flex-col flex-initial gap-2', '3xl:gap-1.5')}
        >
          <Skeleton className="min-h-5 min-w-[70px] rounded-none" />

          <Skeleton className="min-h-[108px] min-w-[343px] rounded-lg" />
        </div>
      ))}
    </div>
  )
}
