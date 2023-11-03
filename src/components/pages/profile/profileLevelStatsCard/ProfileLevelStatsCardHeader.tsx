import { twMerge } from 'tailwind-merge'

import { LatestMatchesResult } from '@/store/slices/lobbySlice'

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
    <div className={twMerge('gap-5 items-center', '3xl:gap-4')}>
      <LevelBadge level={level} />

      <div className="flex-col">
        <span
          className={twMerge(
            'text-lg font-bold uppercase text-white',
            '3xl:text-base'
          )}
        >
          <span className="text-cyan-400">{matches_won}</span> Vitórias
        </span>

        <div className="text-xs font-medium text-gray-300">{latestResults}</div>
      </div>
    </div>
  )
}
