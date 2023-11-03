import { twMerge } from 'tailwind-merge'

interface ProfileHeatmapStatsCardStatsItemProps {
  name: string
  statPercentage: number
  stat: number
}

export function ProfileHeatmapStatsCardStatItem({
  name,
  statPercentage,
  stat,
}: ProfileHeatmapStatsCardStatsItemProps) {
  return (
    <div className="flex-initial items-center justify-between">
      <div className="max-w-fit flex-initial flex-col justify-between gap-1.5">
        <span className="text-xs font-medium uppercase leading-none text-gray-300">
          {name}
        </span>

        <span
          className={twMerge(
            'font-bold text-white leading-none',
            '3xl:text-sm'
          )}
        >
          {statPercentage}%
        </span>
      </div>

      <div className="max-w-fit flex-initial flex-col gap-1">
        <span
          className={twMerge(
            'font-bold text-white leading-none',
            '3xl:text-sm'
          )}
        >
          {stat}
        </span>

        <span className="text-xs font-medium leading-none text-gray-300">
          ACERTOS
        </span>
      </div>
    </div>
  )
}
