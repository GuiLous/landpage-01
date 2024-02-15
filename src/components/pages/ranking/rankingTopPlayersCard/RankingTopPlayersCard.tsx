import { twMerge } from 'tailwind-merge'

import { PlayerRanking } from '@/functions'

import { Avatar } from '@/components/shared'

import { RankingTopPlayersCardBorder } from './RankingTopPlayersCardBorder'
import { RankingTopPlayersCardStats, Stat } from './RankingTopPlayersCardStats'

interface RankingTopPlayersCardProps {
  player: PlayerRanking
}

export function RankingTopPlayersCard({ player }: RankingTopPlayersCardProps) {
  const win_rate =
    player.matches_played !== 0
      ? (player.matches_won / player.matches_played) * 100
      : 0

  const firstRowStats = [
    {
      label: 'Posição',
      value: player.ranking_pos,
    },
    {
      label: 'Rank',
      value: null,
    },
    {
      label: 'Level',
      value: player.level,
    },
  ] as Stat[]

  const secondRowStats = [
    {
      label: 'Vitórias',
      value: player.matches_won,
    },
    {
      label: 'Win Rate',
      value: Math.round(win_rate),
    },
    {
      label: 'KDA',
      value: player.stats.kda || 0,
    },
  ] as Stat[]

  return (
    <div
      className={twMerge(
        'flex-col items-center gap-10 pt-10 px-6 rounded bg-gray-1100',
        '3xl:gap-8 3xl:pt-8 3xl:px-4'
      )}
    >
      <div
        className={twMerge(
          'flex-initial flex-col items-center gap-4',
          '3xl:gap-3'
        )}
      >
        <Avatar
          avatarUrl={player.avatar.medium}
          alt="Player profile"
          size="lg"
        />

        <h2 className={twMerge('leading-none', '3xl:text-sm 3xl:leading-none')}>
          {player.username}
        </h2>
      </div>

      <div
        className={twMerge(
          'max-w-[70%] flex-col items-center gap-10',
          '3xl:gap-8 3xl:max-w-[85%]'
        )}
      >
        <RankingTopPlayersCardStats stats={firstRowStats} />

        <RankingTopPlayersCardStats stats={secondRowStats} />
      </div>

      <RankingTopPlayersCardBorder />
    </div>
  )
}
