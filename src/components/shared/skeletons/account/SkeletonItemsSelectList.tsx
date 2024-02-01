import { twMerge } from 'tailwind-merge'

import { Skeleton } from '@/components/shared'

interface SkeletonItemsSelectListProps {
  isAccountPage?: boolean
}

export function SkeletonItemsSelectList({
  isAccountPage = false,
}: SkeletonItemsSelectListProps) {
  return (
    <div
      className={twMerge(
        'grid grid-cols-[repeat(4,_80px)] content-baseline gap-2',
        '3xl:grid-cols-[repeat(4,_64px)]',
        isAccountPage && 'grid-cols-[repeat(auto-fill,_56px)] h-fit'
      )}
    >
      {Array.from(Array(6)).map((_, index) => (
        <Skeleton key={index} className="min-h-14 min-w-14 max-w-14 rounded" />
      ))}
    </div>
  )
}
