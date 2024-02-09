import { twMerge } from 'tailwind-merge'

import { LevelBadge } from '@/components/shared'

type StatTypes = 'Posição' | 'Rank' | 'Level' | 'Vitórias' | 'Win Rate' | 'KDA'

export type Stat = {
  label: StatTypes
  value: number
}

interface RankingTopPlayersCardStatsProps {
  stats: Stat[]
}

export function RankingTopPlayersCardStats({
  stats = [],
}: RankingTopPlayersCardStatsProps) {
  return (
    <div className={twMerge('items-baseline gap-9', '3xl:gap-7')}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className={twMerge(
            'flex-col items-center justify-center gap-5',
            '3xl:gap-3'
          )}
        >
          <span
            className={twMerge(
              'leading-none text-gray-300',
              '3xl:text-sm 3xl:leading-none'
            )}
          >
            {stat.label}
          </span>
          {stat.label === 'Rank' && (
            <LevelBadge level={stat.value} variant="sm" />
          )}

          {stat.label !== 'Rank' && (
            <span
              className={twMerge(
                'leading-none text-white',
                '3xl:text-sm 3xl:leading-none'
              )}
            >
              {stat.value}
              {stat.label === 'Win Rate' && '%'}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
