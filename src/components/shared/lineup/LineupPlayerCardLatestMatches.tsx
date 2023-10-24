import { twMerge } from 'tailwind-merge'

import { LatestMatchesResult } from '@/store/slices/lobbySlice'

import { Divider } from '@/components/shared'

import { useLatestMatchesResults } from '@/hooks'

interface LineupPlayerCardLatestMatchesProps {
  latest_matches_results?: LatestMatchesResult[]
  matches_played?: number
}

export function LineupPlayerCardLatestMatches({
  latest_matches_results = [],
  matches_played = 0,
}: LineupPlayerCardLatestMatchesProps) {
  const latestMatchesResults = useLatestMatchesResults({
    latestMatchesResults: latest_matches_results?.filter(
      (val) => val !== 'N/A'
    ),
    colorize: false,
  })

  const renderLatestMatchesResults = () => {
    const noMatches = latest_matches_results?.every((val) => val === 'N/A')
    if (noMatches) return 'N/A'
    else return latestMatchesResults
  }

  return (
    <div className="flex-initial flex-col items-center gap-2">
      <div className="justify-center">
        <span
          className={twMerge(
            'text-xs font-medium uppercase',
            '3xl:text-[0.625rem]'
          )}
        >
          últimas partidas
        </span>
      </div>

      <div className="justify-center 3xl:text-sm">
        {renderLatestMatchesResults()}
      </div>

      <Divider className="max-w-[70%] bg-white/[0.24] opacity-100" />

      <div className="justify-center">
        <span
          className={twMerge(
            'text-xs font-medium uppercase',
            '3xl:text-[0.625rem]'
          )}
        >
          {matches_played} Partidas jogadas
        </span>
      </div>
    </div>
  )
}
