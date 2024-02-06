import { twMerge } from 'tailwind-merge'

import { Tooltip } from '@/components/shared'

const statsTable = [
  {
    stat: 'K',
    label: 'Abates',
  },
  {
    stat: 'D',
    label: 'Mortes',
  },
  {
    stat: 'A',
    label: 'Assistências',
  },
  {
    stat: 'HS',
    label: 'Tiros na cabeça',
  },
  {
    stat: 'HS%',
    label: 'Porcentagem de tiros na cabeça',
  },
  {
    stat: 'BP',
    label: 'Bombas plantadas',
  },
  {
    stat: 'BD',
    label: 'Bombas desarmadas',
  },
  {
    stat: 'FK',
    label: 'Primeiros abates',
  },
  {
    stat: 'KDR',
    label: 'Abates por morte',
  },
  {
    stat: 'ADR',
    label: 'Dano por round',
  },
  {
    stat: '2k',
    label: 'Total de 2 abates',
  },
  {
    stat: '3k',
    label: 'Total de 3 abates',
  },
  {
    stat: '4k',
    label: 'Total de 4 abates',
  },
  {
    stat: '5k',
    label: 'Total de 5 abates',
  },
]

interface MatchStatsTableHeaderProps {
  isSameScore: boolean
  isWinning: boolean
  teamName: string
}

export function MatchStatsTableHeader({
  isSameScore,
  isWinning,
  teamName,
}: MatchStatsTableHeaderProps) {
  return (
    <thead className="">
      <tr
        className={twMerge(
          'bg-gradient_match_table',
          !isSameScore && isWinning && 'bg-gradient_match_table_winner',
          !isSameScore && !isWinning && 'bg-gradient_match_table_loser'
        )}
      >
        <th
          className={twMerge(
            'w-[300px] max-w-[300px] tracking-wide leading-none overflow-hidden border-0 p-3.5 text-left font-medium uppercase text-white',
            '3xl:w-[280px] 3xl:max-w-[280px]',
            'ultrawide:text-2xl'
          )}
        >
          Time {teamName}
        </th>

        {statsTable.map((stat) => (
          <Tooltip key={stat.stat} content={stat.label}>
            <th
              className={twMerge(
                'border-0 p-3.5 text-center font-medium leading-none text-white',
                'ultrawide:text-2xl'
              )}
            >
              {stat.stat}
            </th>
          </Tooltip>
        ))}
      </tr>
    </thead>
  )
}
