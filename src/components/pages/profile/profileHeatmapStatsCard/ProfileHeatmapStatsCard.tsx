import { twMerge } from 'tailwind-merge'

import { getUserProfile } from '@/functions'

import { ProfileCard, ProfileHeatmapStatsCardIcon } from '@/components/shared'

import { ProfileHeatmapStatsCardStatItem } from './ProfileHeatmapStatsCardStatItem'

interface ProfileHeatmapStatsCardProps {
  userId: number
}

export async function ProfileHeatmapStatsCard({
  userId,
}: ProfileHeatmapStatsCardProps) {
  const profile = await getUserProfile(userId)
  const { stats } = profile
  const { head_shots, chest_shots, other_shots } = stats

  const totalShots = (head_shots || 0) + (chest_shots || 0) + (other_shots || 0)

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
