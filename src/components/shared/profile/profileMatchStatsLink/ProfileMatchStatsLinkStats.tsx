import { RiArrowRightSLine } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'

import { StatsMatchProfileType } from '@/functions'

import { MatchStatus } from '@/store/matchStore'

import { CustomIcon, Tooltip } from '@/components/shared'

type StatType = 'kda' | 'kdr' | 'head_accuracy' | 'adr' | 'firstkills'

interface ProfileMatchStatsLinkStatsProps {
  status?: MatchStatus
  showGameStatus: boolean
  stats: StatsMatchProfileType
  isLink?: boolean
}

const statsFields = [
  {
    field: 'kda',
    title: 'kda',
    label: 'Mortes, Abates e Assistências',
    minWidth: '66px',
  },
  {
    field: 'kdr',
    title: 'kdr',
    label: 'Abates por morte',
    minWidth: '30',
  },
  {
    field: 'head_accuracy',
    title: 'hs%',
    label: 'Porcentagem de tiros na cabeça',
    minWidth: '35',
  },
  {
    field: 'adr',
    title: 'adr',
    label: 'Dano médio por round',
    minWidth: '30',
  },
  {
    field: 'firstkills',
    title: 'fk',
    label: 'Primeiros abates',
    minWidth: '26',
  },
]

export function ProfileMatchStatsLinkStats({
  showGameStatus,
  status,
  stats,
  isLink = true,
}: ProfileMatchStatsLinkStatsProps) {
  return (
    <div className={twMerge('items-center justify-center gap-10', '3xl:gap-7')}>
      {statsFields.map((stat, index) => (
        <div
          key={index}
          className={twMerge('items-center flex-col gap-3', '3xl:gap-2.5')}
          style={{ minWidth: `${stat.minWidth}px` }}
        >
          <Tooltip content={stat.label}>
            <span className="items-start text-xs font-medium uppercase leading-none text-gray-300">
              {stat.title}
            </span>
          </Tooltip>

          <span
            className={twMerge(
              'items-start font-semibold leading-none text-white',
              '3xl:text-sm'
            )}
          >
            {(status === 'running' || status === 'warmup') && '-'}
            {showGameStatus && stats[stat.field as StatType]}
            {showGameStatus && stat.title.includes('%') && '%'}
          </span>
        </div>
      ))}

      {isLink && (
        <CustomIcon
          icon={RiArrowRightSLine}
          size={24}
          className={twMerge(
            'text-gray-300 transition-colors',
            'group-hover:text-white'
          )}
        />
      )}
    </div>
  )
}
