'use client'

import { MouseEvent, useState } from 'react'
import { FaCrown } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'

import { Friend } from '@/store/friendStore'

import { Avatar } from '@/components/shared'

import { useAuth } from '@/hooks'

import { LineupMenuContext } from '../lineup/LineupMenuContext'
import { SideType } from './LineupCustomSide'

interface LineupCustomPlayerCardProps {
  side?: SideType
  player: Friend
  isLobbyOwner?: boolean
  isUserPlayerSide: boolean
  userPlayerSide: SideType
  playSoundClick: () => void
  playSoundHover: () => void
  onClose?: false | (() => Promise<void>)
}

export function LineupCustomPlayerCard({
  side = 'Defensores',
  player,
  isLobbyOwner = false,
  playSoundClick,
  playSoundHover,
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
      <button className="flex h-full flex-1 items-center justify-center">
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
            onClose={onClose}
          />
        </div>
      </button>
    </li>
  )
}
