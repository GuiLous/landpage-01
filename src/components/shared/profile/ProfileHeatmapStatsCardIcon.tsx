import { twMerge } from 'tailwind-merge'

import { FullBodyIcon } from '@/components/shared'

interface ProfileHeatmapStatsCardIconProps {
  otherShotsPercent: number
  chestShotsPercent: number
  headShotsPercent: number
}

export function ProfileHeatmapStatsCardIcon({
  chestShotsPercent,
  headShotsPercent,
  otherShotsPercent,
}: ProfileHeatmapStatsCardIconProps) {
  return (
    <div
      className={twMerge(
        'h-[190px] w-[73px] max-w-fit flex-initial items-center justify-center',
        '3xl:h-[180px] 3xl:w-[63px]'
      )}
    >
      <FullBodyIcon
        className={twMerge('mt-1 h-[238px]', '3xl:h-[228px] shrink-0')}
        opacityOthers={otherShotsPercent / 100}
        opacityChest={chestShotsPercent / 100}
        opacityHead={headShotsPercent / 100}
      />
    </div>
  )
}
