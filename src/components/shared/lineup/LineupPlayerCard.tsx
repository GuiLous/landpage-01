import { twMerge } from 'tailwind-merge'

import { useAppSelector } from '@/store'
import { Friend } from '@/store/slices/friendSlice'

import { LevelBadge } from '@/components/shared'

import { LineupPlayerCardCloseBtn } from './LineupPlayerCardCloseBtn'
import { LineupPlayerCardHeader } from './LineupPlayerCardHeader'
import { LineupPlayerCardIcons } from './LineupPlayerCardIcons'
import { LineupPlayerCardLatestMatches } from './LineupPlayerCardLatestMatches'

interface LineupPlayerCardProps {
  player: Friend
  onClose?: false | (() => Promise<void>)
  closeLabel: string | null
}

export function LineupPlayerCard({
  closeLabel,
  player,
  onClose,
}: LineupPlayerCardProps) {
  const lobby = useAppSelector((state) => state.lobby)
  const isLobbyOwner = player.user_id === lobby.id

  return (
    <div
      className={twMerge(
        'relative h-full min-w-[200px] flex-col justify-between rounded-lg px-5 py-[3.375rem]',
        '3xl:px-2.5 3xl:py-8',
        'bg-player_card bg-cover'
      )}
    >
      {onClose && (
        <LineupPlayerCardCloseBtn closeLabel={closeLabel} onClose={onClose} />
      )}

      <LineupPlayerCardHeader
        isLobbyOwner={isLobbyOwner}
        avatar={player.avatar.large}
        username={player.username}
      />

      <LineupPlayerCardLatestMatches
        matches_played={player.matches_played}
        latest_matches_results={player.latest_matches_results}
      />

      <div className="flex-initial justify-center">
        <LevelBadge level={player.level} />
      </div>

      <LineupPlayerCardIcons
        steam_url={player.steam_url}
        user_id={player.user_id}
      />
    </div>
  )
}
