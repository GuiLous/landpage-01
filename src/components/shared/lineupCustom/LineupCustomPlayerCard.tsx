'use client'

import { MouseEvent, useState } from 'react'
import { FaCrown } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'

import { Friend } from '@/store/friendStore'

import { Avatar } from '@/components/shared'

import { LineupMenuContext } from '../lineup/LineupMenuContext'
import { SideType } from './LineupCustomSide'

interface LineupCustomPlayerCardProps {
  side?: SideType
  player: Friend
  isLobbyOwner?: boolean
  playSoundClick: () => void
  playSoundHover: () => void
}

export function LineupCustomPlayerCard({
  side = 'Defensores',
  player,
  isLobbyOwner = false,
  playSoundClick,
  playSoundHover,
}: LineupCustomPlayerCardProps) {
  const [openMenu, setOpenMenu] = useState(false)

  const handleToggleMenu = (e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault()
    playSoundClick()

    setOpenMenu((prev) => !prev)
  }

  return (
    <li
      className={twMerge(
        'flex max-h-16 max-w-full cursor-pointer flex-1 items-center justify-start bg-cyan-400/40 px-3.5',
        side === 'Atacantes' && 'bg-red-400/40',
        side === 'Observadores' && 'bg-white/30',
        isLobbyOwner && 'outline outline-1 outline-white',
        'last:rounded-b',
        'ultrawide:max-h-28 ultrawide:px-6'
      )}
      onClick={handleToggleMenu}
      onContextMenu={handleToggleMenu}
      onMouseEnter={playSoundHover}
    >
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

        <LineupMenuContext
          player={player}
          isMenuOpen={openMenu}
          setIsMenuOpen={setOpenMenu}
          side="left"
        />
      </div>
    </li>
  )
}
