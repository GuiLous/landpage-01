import { twMerge } from 'tailwind-merge'

import { MatchProfileType } from '@/functions'

interface ProfileMatchHistoryListHeaderProps {
  matches: MatchProfileType[]
}

export function ProfileMatchHistoryListHeader({
  matches,
}: ProfileMatchHistoryListHeaderProps) {
  return (
    <header className="max-w-fit flex-initial items-center justify-between">
      <div className="items-baseline gap-3">
        <h2
          className={twMerge(
            'text-[1.375rem] font-bold uppercase leading-none text-white',
            '3xl:text-xl',
            'ultrawide:text-3xl ultrawide:leading-none'
          )}
        >
          Últimas Partidas
        </h2>

        <span
          className={twMerge(
            'text-gray-300 text-sm',
            'leading-none',
            '3xl:text-xs',
            'ultrawide:text-xl ultrawide:leading-none'
          )}
        >
          {matches.length === 1
            ? matches.length + ' Partida'
            : matches.length + ' Partidas'}
        </span>
      </div>
    </header>
  )
}
