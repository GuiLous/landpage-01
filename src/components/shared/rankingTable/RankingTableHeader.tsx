/* eslint-disable @typescript-eslint/no-unused-vars */
import { twMerge } from 'tailwind-merge'

import { Tooltip } from '@/components/shared'

export type FieldsTableType = {
  stat: string
  label: 'Posição' | 'Nome de usuário' | 'Rank' | 'Level' | 'Win Rate' | 'KDA'
}

interface RankingTableHeaderProps {
  fieldsTable: FieldsTableType[]
}

export function RankingTableHeader({ fieldsTable }: RankingTableHeaderProps) {
  return (
    <thead>
      <tr className={twMerge('bg-gray-700/50 rounded-t overflow-hidden')}>
        {fieldsTable.map((stat, index) => (
          <Tooltip key={stat.stat} content={stat.label} side="left">
            <th
              className={twMerge(
                'border-0 py-[1.125rem] text-left text-sm font-medium leading-none text-gray-300',
                'ultrawide:text-2xl',
                index === 0 && 'pl-6 w-[15%] rounded-tl',
                index === 5 && 'w-[9%] rounded-tr',
                [2, 3, 4].includes(index) && 'w-[13%]'
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
