import { FaCrown } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'

interface LineupPlayerCardPlayerInfoProps {
  isLobbyOwner: boolean
  username: string
  matches_played: number
}

export function LineupPlayerCardPlayerInfo({
  isLobbyOwner,
  username,
  matches_played,
}: LineupPlayerCardPlayerInfoProps) {
  return (
    <div className="flex-col">
      <div className="items-center gap-1.5">
        {isLobbyOwner && <FaCrown className="mb-0.5 text-sm text-white" />}

        <h3
          className={twMerge(
            'max-w-[150px] truncate italic text-sm font-bold',
            '3xl:max-w-[100px]'
          )}
        >
          {username}
        </h3>
      </div>

      <p className="text-xs">
        {matches_played}{' '}
        {matches_played !== 1 ? ' Partidas jogadas' : ' Partida jogada'}
      </p>
    </div>
  )
}
