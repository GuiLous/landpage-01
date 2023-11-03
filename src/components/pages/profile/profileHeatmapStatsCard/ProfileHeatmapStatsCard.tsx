import { twMerge } from 'tailwind-merge'

import { ProfileCard } from '@/components/shared'

import { ProfileHeatmapStatsCardIcon } from './ProfileHeatmapStatsCardIcon'
import { ProfileHeatmapStatsCardStatItem } from './ProfileHeatmapStatsCardStatItem'

interface ProfileHeatmapStatsCardProps {
  head_shots: number
  chest_shots: number
  other_shots: number
}

export function ProfileHeatmapStatsCard({
  chest_shots,
  head_shots,
  other_shots,
}: ProfileHeatmapStatsCardProps) {
  const totalShots = head_shots + chest_shots + other_shots

  const headShotsPercent =
    totalShots === 0 ? 0 : Number((head_shots * 100) / totalShots).toFixed(0)
  const chestShotsPercent =
    totalShots === 0 ? 0 : Number((chest_shots * 100) / totalShots).toFixed(0)
  const otherShotsPercent =
    totalShots === 0 ? 0 : Number((other_shots * 100) / totalShots).toFixed(0)

  return (
    <ProfileCard title="Heatmap de Acertos">
      <div className={twMerge('gap-10', '3xl:gap-7')}>
        <ProfileHeatmapStatsCardIcon
          chestShotsPercent={Number(chestShotsPercent)}
          headShotsPercent={Number(headShotsPercent)}
          otherShotsPercent={Number(otherShotsPercent)}
        />

        <div className={twMerge('flex-col justify-evenly pr-7', '3xl:pr-2.5')}>
          <ProfileHeatmapStatsCardStatItem
            name="cabeça"
            stat={head_shots}
            statPercentage={Number(headShotsPercent)}
          />

          <ProfileHeatmapStatsCardStatItem
            name="peito"
            stat={chest_shots}
            statPercentage={Number(chestShotsPercent)}
          />

          <ProfileHeatmapStatsCardStatItem
            name="outros"
            stat={other_shots}
            statPercentage={Number(otherShotsPercent)}
          />
        </div>
      </div>
    </ProfileCard>
  )
}
