import { twMerge } from 'tailwind-merge'

import { Skeleton } from '@/components/shared'

export function SkeletonModalReloadCoinsListCards() {
  return (
    <div
      className={twMerge(
        'gap-5 grid max-w-[1068px] grid-cols-3',
        '3xl:gap-3.5 3xl:max-w-[768px]'
      )}
    >
      {Array.from(Array(6)).map((_, index) => (
        <Skeleton
          key={index}
          className={twMerge(
            'min-w-[344px] min-h-[300px]',
            '3xl:min-w-[246px] 3xl:min-h-[205px]'
          )}
        />
      ))}
    </div>
  )
}
