'use client'

import { MouseEvent, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { twMerge } from 'tailwind-merge'

import { Friend } from '@/store/friendStore'
import { useLobbyStore } from '@/store/lobbyStore'

import { LevelBadge } from '@/components/shared'

import { LineupMenuContext } from './LineupMenuContext'
import { LineupPlayerCardPlayerInfo } from './LineupPlayerCardPlayerInfo'
import { LineupPlayerCardProfile } from './LineupPlayerCardProfile'

interface LineupPlayerCardProps {
  player: Friend
  playSoundClick: () => void
  playSoundHover: () => void
  onClose?: false | (() => Promise<void>)
}

export function LineupPlayerCard({
  player,
  onClose,
  playSoundClick,
  playSoundHover,
}: LineupPlayerCardProps) {
  const isUltrawide = useMediaQuery({
    query: '(min-width: 2560px)',
  })

  const { lobby } = useLobbyStore()

  const isLobbyOwner = player.user_id === lobby?.id

  const [openMenu, setOpenMenu] = useState(false)

  const handleToggleMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    playSoundClick()

    setOpenMenu((prev) => !prev)
  }

  return (
    <div
      className={twMerge(
        'bg-cover bg-center relative cursor-pointer h-full min-w-[200px] flex-col justify-between rounded-lg p-5',
        'after:bg-gradient_player_card after:bottom-0 after:h-24 after:left-0 after:opacity-80 after:absolute after:w-full',
        '3xl:p-2.5'
      )}
      style={{ backgroundImage: player.card ? `url(${player.card})` : '' }}
      onClick={handleToggleMenu}
      onContextMenu={handleToggleMenu}
      onMouseEnter={playSoundHover}
    >
      <div className="absolute -right-1.5 -top-1.5 max-w-fit flex-initial">
        <LevelBadge level={player.level} variant={isUltrawide ? 'lg' : 'md'} />
      </div>

      <LineupMenuContext
        player={player}
        isMenuOpen={openMenu}
        setIsMenuOpen={setOpenMenu}
        onClose={onClose}
      />

      <div className="items-end">
        <div className="z-10 items-center justify-between">
          <LineupPlayerCardPlayerInfo
            isLobbyOwner={isLobbyOwner}
            matches_played={player.matches_played || 0}
            username={player.username}
          />
          <LineupPlayerCardProfile avatar={player.avatar.large} />
        </div>
      </div>
    </div>
  )
}
