import { Skeleton } from '@/components/shared'

export function SkeletonStoreRotationTimer() {
  return (
    <div className="items-center justify-between">
      <Skeleton className="min-h-7 min-w-[305px]" />

      <Skeleton className="min-h-7 min-w-32" />
    </div>
  )
}
