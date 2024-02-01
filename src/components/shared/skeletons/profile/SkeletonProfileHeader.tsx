import { twMerge } from 'tailwind-merge'

import { Skeleton } from '@/components/shared'

export function SkeletonProfileHeader() {
  return (
    <header
      className={twMerge(
        'flex-initial min-h-[232px] flex-col p-[3.750rem] bg-gray-1000',
        '3xl:py-11 3xl:px-7'
      )}
    >
      <div
        className={twMerge(
          'items-end justify-between gap-[6.25rem] flex-initial z-10',
          '3xl:gap-5'
        )}
      >
        <div
          className={twMerge(
            'items-center gap-4 max-w-[600px]',
            '3xl:gap-3.5 3xl:max-w-[520px]'
          )}
        >
          <Skeleton className="min-h-[104px] min-w-[104px] rounded-full" />

          <div className={twMerge('flex-col gap-2.5', '3xl:gap-2')}>
            <div className="max-w-fit items-center gap-3.5">
              <Skeleton className="min-h-6 min-w-20" />
              <Skeleton className="min-h-5 min-w-20" />
            </div>

            <div className="max-w-[318px] flex-col gap-2">
              <Skeleton className="min-h-2 min-w-full" />

              <div className="items-center justify-between">
                <Skeleton className="min-h-5 min-w-12" />
                <Skeleton className="min-h-5 min-w-12" />
              </div>
            </div>

            <div className="items-center gap-3.5">
              <Skeleton className="min-h-[18px] min-w-[18px] rounded-full" />
              <Skeleton className="min-h-[18px] min-w-[18px] rounded-full" />
            </div>
          </div>
        </div>

        <div className="max-w-fit items-center gap-3">
          <Skeleton className="min-h-11 min-w-11 rounded" />
          <Skeleton className="min-h-11 min-w-11 rounded" />
          <Skeleton className="min-h-11 min-w-11 rounded" />
        </div>
      </div>
    </header>
  )
}
