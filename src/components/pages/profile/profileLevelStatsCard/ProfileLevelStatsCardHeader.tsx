import { twMerge } from 'tailwind-merge'

import { LatestMatchesResult } from '@/store/lobbyStore'

import { LevelBadge } from '@/components/shared'

import { useLatestMatchesResults } from '@/hooks'

interface ProfileLevelStatsCardHeaderProps {
  level: number
  matches_won: number
  latest_matches_results: LatestMatchesResult[]
}

export function ProfileLevelStatsCardHeader({
  level,
  matches_won,
  latest_matches_results,
}: ProfileLevelStatsCardHeaderProps) {
  const latestResults = useLatestMatchesResults({
    latestMatchesResults: latest_matches_results,
  })

  return (
    <div
      className={twMerge('gap-5 items-center', '3xl:gap-4', 'ultrawide:gap-7')}
    >
      <LevelBadge level={level} />

      <div className="flex-col">
        <span
          className={twMerge(
            'text-lg font-bold uppercase text-white',
            '3xl:text-base',
            'ultrawide:text-2xl'
          )}
        >
          <span className="text-cyan-400">{matches_won}</span> Vitórias
        </span>

        <div
          className={twMerge(
            'text-xs font-medium text-gray-300',
            'ultrawide:text-lg'
          )}
        >
          {latestResults}
        </div>
      </div>
    </div>
  )
}
