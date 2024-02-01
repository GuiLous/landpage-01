import { twMerge } from 'tailwind-merge'

import { Skeleton } from '@/components/shared'

export function SkeletonStoreListItems() {
  return (
    <div
      className={twMerge(
        'grid grid-cols-4 gap-6 gap-y-10',
        'store-md:grid-cols-store-md',
        'store-sm:grid-cols-store-sm'
      )}
    >
      {Array.from(Array(8)).map((_, index) => (
        <Skeleton
          key={index}
          className="min-h-[430px] w-full max-w-full flex-1 rounded-lg"
        />
      ))}
    </div>
  )
}
