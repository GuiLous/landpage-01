'use client'

import { MouseEvent, ReactNode, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Friend } from '@/store/friendStore'

import { useAuth } from '@/hooks'

import { LineupMenuContext } from '../lineup/LineupMenuContext'
import { SideType } from './LineupCustomSide'

interface LineupCustomPlayerCardProps {
  side?: SideType
  player: Friend
  isUserPlayerSide: boolean
  userPlayerSide: SideType
  playSoundClick: () => void
  playSoundHover: () => void
  children: ReactNode
  onClose?: false | (() => Promise<void>)
}

export function LineupCustomPlayerCard({
  side = 'Defensores',
  player,
  playSoundClick,
  playSoundHover,
  children,
  onClose,
  isUserPlayerSide,
  userPlayerSide,
}: LineupCustomPlayerCardProps) {
  const auth = useAuth()

  const [openMenu, setOpenMenu] = useState(false)

  const isBgGreen = isUserPlayerSide && userPlayerSide !== 'Observadores'
  const isBgRed = !isUserPlayerSide && userPlayerSide !== 'Observadores'
  const isBgGray = userPlayerSide === 'Observadores'

  const handleToggleMenu = (e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault()
    playSoundClick()

    setOpenMenu((prev) => !prev)
  }

  return (
    <li
      className={twMerge(
        'flex max-h-16 max-w-full cursor-pointer flex-1 items-center justify-start px-3.5',
        isBgGreen && 'bg-cyan-400/40',
        isBgRed && 'bg-red-400/40',
        isBgGray && 'bg-white/30',
        side === 'Observadores' && 'bg-white/30',
        player.user_id === auth?.id && 'outline outline-1 outline-white',
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
        onClose={onClose}
      />
    </li>
  )
}
