import { twMerge } from 'tailwind-merge'

import { Tooltip } from '@/components/shared'

type Stat = {
  label: string
  stat?: number
  messageTooltip: string
}

interface ProfileLevelStatsCardItemProps {
  firstStat: Stat
  secondStat: Stat
  addPadding?: boolean
  center?: boolean
  fullWidth?: boolean
}
export function ProfileLevelStatsCardItem({
  firstStat,
  secondStat,
  addPadding = false,
  center = false,
  fullWidth = false,
}: ProfileLevelStatsCardItemProps) {
  return (
    <li
      className={twMerge(
        'flex flex-col',
        addPadding && 'pl-8',
        fullWidth && 'w-full flex-1'
      )}
    >
      <div
        className={twMerge(
          'my-5 max-w-fit flex-initial flex-col',
          center && 'self-center',
          '3xl:mt-4'
        )}
      >
        <Tooltip content={firstStat.messageTooltip}>
          <span className="whitespace-nowrap text-xs font-medium uppercase text-gray-300">
            {firstStat.label}
          </span>
        </Tooltip>

        <span className={twMerge('font-semibold text-white', '3xl:text-sm')}>
          {firstStat?.stat || 0}
          {firstStat.label === 'Hs Kills %' && '%'}
        </span>
      </div>

      <div
        className={twMerge(
          'my-5 max-w-fit flex-initial flex-col',
          center && 'self-center',
          '3xl:mt-4'
        )}
      >
        <Tooltip content={secondStat.messageTooltip}>
          <span className="whitespace-nowrap text-xs font-medium uppercase text-gray-300">
            {secondStat.label}
          </span>
        </Tooltip>

        <span className={twMerge('font-semibold text-white', '3xl:text-sm')}>
          {secondStat?.stat || 0}
        </span>
      </div>
    </li>
  )
}
