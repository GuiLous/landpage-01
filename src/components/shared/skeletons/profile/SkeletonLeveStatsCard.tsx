import { ProfileCard, Skeleton } from '@/components/shared'

export function SkeletonLeveStatsCard() {
  return (
    <ProfileCard>
      <div className="min-h-[247px] min-w-[302px] flex-col justify-between gap-10">
        <div className="flex-initial items-center gap-8">
          <Skeleton className="ml-3 mt-3 min-h-[55px] min-w-[55px]" />

          <div className="mt-5 flex-col justify-center gap-2">
            <Skeleton className="min-h-4 min-w-28" />
            <Skeleton className="min-h-3 min-w-36" />
          </div>
        </div>

        <div className="justify-between">
          <div className="max-w-fit flex-col justify-between">
            <Skeleton className="min-h-6 min-w-14" />
            <Skeleton className="min-h-6 min-w-14" />
          </div>
          <div className="max-w-fit flex-col justify-between">
            <Skeleton className="min-h-6 min-w-14" />
            <Skeleton className="min-h-6 min-w-14" />
          </div>
          <div className="max-w-fit flex-col justify-between">
            <Skeleton className="min-h-6 min-w-14" />
            <Skeleton className="min-h-6 min-w-14" />
          </div>
        </div>
      </div>
    </ProfileCard>
  )
}
