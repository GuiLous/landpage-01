'use client'

import { MouseEvent, ReactNode, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Friend } from '@/store/friendStore'

import { LineupMenuContext } from '../lineup/LineupMenuContext'
import { SideType } from './LineupCustomSide'

interface LineupCustomPlayerCardProps {
  side?: SideType
  player: Friend
  isLobbyOwner?: boolean
  playSoundClick: () => void
  playSoundHover: () => void
  children: ReactNode
}

export function LineupCustomPlayerCard({
  side = 'Defensores',
  player,
  isLobbyOwner = false,
  playSoundClick,
  playSoundHover,
  children,
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
      {children}

      <LineupMenuContext
        player={player}
        isMenuOpen={openMenu}
        setIsMenuOpen={setOpenMenu}
        side="left"
      />
    </li>
  )
}
