import { FaCrown } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'

import { Friend } from '@/store/friendStore'

import { Avatar } from '@/components/shared'

interface LineupCustomPlayerCardContentProps {
  player: Friend
  isLobbyOwner: boolean
}

export function LineupCustomPlayerCardContent({
  player,
  isLobbyOwner,
}: LineupCustomPlayerCardContentProps) {
  return (
    <div
      className={twMerge(
        'items-center justify-start gap-3.5',
        'ultrawide:gap-6'
      )}
    >
      <Avatar
        avatarUrl={player.avatar.medium}
        alt="Player image"
        size="md"
        className={twMerge('border border-white', 'ultrawide:border-2')}
      />

      <div className={twMerge('items-center gap-1', 'ultrawide:gap-2')}>
        {isLobbyOwner && (
          <FaCrown
            className={twMerge('text-sm text-white', 'ultrawide:text-2xl')}
          />
        )}

        <span
          className={twMerge(
            'text-sm font-medium text-white',
            'ultrawide:text-2xl'
          )}
        >
          {player.username}
        </span>
      </div>
    </div>
  )
}
