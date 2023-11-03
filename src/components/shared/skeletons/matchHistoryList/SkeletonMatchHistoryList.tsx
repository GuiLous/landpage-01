import { twMerge } from 'tailwind-merge'

import { Skeleton } from '@/components/shared'

export function SkeletonMatchHistoryList() {
  return (
    <section
      className={twMerge('flex-col rounded bg-gray-1000 p-6', '3xl:p-5')}
    >
      <div className="flex-initial items-end gap-2">
        <Skeleton className="h-[22px] min-w-[210px]" />

        <Skeleton className="h-[20px] min-w-[58px]" />
      </div>

      <div
        className={twMerge(
          'flex-initial flex-col gap-8 mt-9',
          '3xl:gap-5 3xl:mt-8'
        )}
      >
        <div className="items-center gap-3">
          <Skeleton className="h-5 min-w-[90px]" />
          <Skeleton className="h-6 min-w-[24px]" />
        </div>

        <div className="flex-col gap-2">
          {Array.from(Array(4)).map((_, index) => (
            <Skeleton key={index} className="h-[82px] max-w-full" />
          ))}
        </div>
      </div>
    </section>
  )
}
