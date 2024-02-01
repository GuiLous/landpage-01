import { Skeleton } from '@/components/shared'

export function SkeletonMatchDetailsHeader() {
  return (
    <header className="flex-initial items-center justify-between">
      <Skeleton className="min-h-4 min-w-[84px] rounded-none" />

      <Skeleton className="min-h-4 min-w-56 rounded-none" />
    </header>
  )
}
