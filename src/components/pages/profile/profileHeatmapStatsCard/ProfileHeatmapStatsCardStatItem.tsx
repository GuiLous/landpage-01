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
      <div
        className={twMerge(
          'max-w-fit flex-initial flex-col justify-between gap-1.5',
          'ultrawide:gap-2'
        )}
      >
        <span
          className={twMerge(
            'text-xs font-medium uppercase text-gray-300',
            'leading-none',
            'ultrawide:text-xl ultrawide:leading-none'
          )}
        >
          {name}
        </span>

        <span
          className={twMerge(
            'font-bold text-white leading-none',
            '3xl:text-sm',
            'ultrawide:text-2xl ultrawide:leading-none'
          )}
        >
          {statPercentage}%
        </span>
      </div>

      <div
        className={twMerge(
          'max-w-fit flex-initial flex-col gap-1',
          'ultrawide:gap-2'
        )}
      >
        <span
          className={twMerge(
            'font-bold text-white leading-none',
            '3xl:text-sm',
            'ultrawide:text-2xl ultrawide:leading-none'
          )}
        >
          {stat || 0}
        </span>

        <span
          className={twMerge(
            'text-xs font-medium text-gray-300',
            'leading-none',
            'ultrawide:text-xl ultrawide:leading-none'
          )}
        >
          ACERTOS
        </span>
      </div>
    </div>
  )
}
