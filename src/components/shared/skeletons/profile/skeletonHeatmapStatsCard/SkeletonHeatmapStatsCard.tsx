import { twMerge } from 'tailwind-merge'

import { ProfileCard, ProfileHeatmapStatsCardIcon } from '@/components/shared'

import { SkeletonHeatmapStatsCardStatItem } from './SkeletonHeatmapStatsCardStatItem'

export function SkeletonHeatmapStatsCard() {
  return (
    <ProfileCard title="Heatmap de Acertos">
      <div className={twMerge('gap-10', '3xl:gap-7')}>
        <ProfileHeatmapStatsCardIcon
          chestShotsPercent={0}
          headShotsPercent={0}
          otherShotsPercent={0}
        />

        <div className={twMerge('flex-col justify-evenly pr-7', '3xl:pr-2.5')}>
          <SkeletonHeatmapStatsCardStatItem name="cabeça" />

          <SkeletonHeatmapStatsCardStatItem name="peito" />

          <SkeletonHeatmapStatsCardStatItem name="outros" />
        </div>
      </div>
    </ProfileCard>
  )
}
