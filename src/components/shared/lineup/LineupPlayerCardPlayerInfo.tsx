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
        {isLobbyOwner && (
          <FaCrown
            className={twMerge(
              'mb-0.5 text-sm text-white',
              'ultrawide:text-2xl'
            )}
          />
        )}

        <h3
          className={twMerge(
            'max-w-[150px] truncate italic text-sm font-bold',
            '3xl:max-w-[100px]',
            'ultrawide:text-2xl'
          )}
        >
          {username}
        </h3>
      </div>

      <p className={twMerge('text-xs', 'ultrawide:text-xl')}>
        {matches_played}{' '}
        {matches_played !== 1 ? ' Partidas jogadas' : ' Partida jogada'}
      </p>
    </div>
  )
}
