import { twMerge } from 'tailwind-merge'

export function RankingTopPlayersCardBorder() {
  return (
    <div
      className={twMerge(
        'bg-purple-400 rounded-t-lg min-h-1.5 max-w-[80%]',
        '3xl:min-h-1 3xl:max-w-[90%]'
      )}
    />
  )
}
