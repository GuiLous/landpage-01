import { twMerge } from 'tailwind-merge'

import { MatchStatus } from '@/store/matchStore'

interface ProfileMatchStatsLinkStatusProps {
  linkWidth: number
  isLink: boolean
  won: boolean
  score: string
  status?: MatchStatus
  showGameStatus: boolean
}

export function ProfileMatchStatsLinkStatus({
  linkWidth,
  isLink,
  status,
  showGameStatus,
  won,
  score,
}: ProfileMatchStatsLinkStatusProps) {
  return (
    <div
      className={twMerge('justify-start', linkWidth < 950 && 'justify-center')}
    >
      <div className="min-w-[70px] max-w-fit flex-col items-center justify-center gap-3.5">
        <span
          className={twMerge(
            'text-center text-xs font-medium',
            'leading-none',
            (isLink || status === 'running') && 'text-gray-300',
            !isLink && status !== 'running' && won && 'text-green-600',
            !isLink && status !== 'running' && !won && 'text-red-500',
            'ultrawide:text-xl ultrawide:leading-none'
          )}
        >
          {status === 'running' && 'EM PARTIDA'}
          {showGameStatus && won && 'VITÓRIA'}
          {showGameStatus && !won && 'DERROTA'}
        </span>

        <span
          className={twMerge(
            'text-center text-xl font-semibold text-white',
            'leading-none',
            'ultrawide:text-4xl ultrawide:leading-none'
          )}
        >
          {score}
        </span>
      </div>
    </div>
  )
}
