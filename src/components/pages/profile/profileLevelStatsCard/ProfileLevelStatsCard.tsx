'use client'

import { LatestMatchesResult } from '@/store/slices/lobbySlice'
import { Stats } from '@/store/slices/matchSlice'

import { ProfileCard } from '@/components/shared'

import { ProfileLevelStatsCardHeader } from './ProfileLevelStatsCardHeader'
import { ProfileLevelStatsCardItem } from './ProfileLevelStatsCardItem'

interface ProfileLevelStatsCardProps {
  level: number
  highest_level: number
  matches_won: number
  highest_win_streak: number
  latest_matches_results: LatestMatchesResult[]
  most_kills_in_a_match?: number
  most_damage_in_a_match?: number
  stats: Stats
}

export function ProfileLevelStatsCard({
  stats,
  highest_level,
  highest_win_streak,
  latest_matches_results,
  level,
  matches_won,
  most_damage_in_a_match,
  most_kills_in_a_match,
}: ProfileLevelStatsCardProps) {
  const statsMap = {
    kdr: {
      label: 'KDR',
      stat: stats.kdr,
      messageTooltip: 'Média de abates e mortes por partida',
    },
    max_level: {
      label: 'Max Level',
      stat: highest_level,
      messageTooltip: 'Maior level atingido',
    },
    max_kills: {
      label: 'Max kills',
      stat: most_kills_in_a_match,
      messageTooltip: 'Maior quantidade de abates em uma partida',
    },
    max_wins: {
      label: 'Max Wins',
      stat: highest_win_streak,
      messageTooltip: 'Max Win Streak: Maior quantidade de vitórias seguidas',
    },
    hs: {
      label: 'Hs Kills %',
      stat: stats.hsk,
      messageTooltip: 'Percentual de abates por tiros na cabeça',
    },
    max_damage: {
      label: 'Max Dano',
      stat: most_damage_in_a_match,
      messageTooltip: 'Maior quantidade de dano causado em uma partida',
    },
  }

  return (
    <ProfileCard>
      <div className="flex-col">
        <ProfileLevelStatsCardHeader
          latest_matches_results={latest_matches_results}
          level={level}
          matches_won={matches_won}
        />

        <ul className="flex w-full flex-1 flex-wrap">
          <ProfileLevelStatsCardItem
            firstStat={statsMap.kdr}
            secondStat={statsMap.max_level}
          />

          <ProfileLevelStatsCardItem
            firstStat={statsMap.max_kills}
            secondStat={statsMap.max_wins}
            center
            fullWidth
          />

          <ProfileLevelStatsCardItem
            firstStat={statsMap.hs}
            secondStat={statsMap.max_damage}
            addPadding
          />
        </ul>
      </div>
    </ProfileCard>
  )
}
