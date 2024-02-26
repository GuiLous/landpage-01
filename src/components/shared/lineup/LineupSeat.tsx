'use client'

import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { useAppStore } from '@/store/appStore'

interface LineupSeatProps {
  playSoundClick: () => void
  playSoundHover: () => void
  children: ReactNode
}

export function LineupSeat({
  playSoundClick,
  playSoundHover,
  children,
}: LineupSeatProps) {
  const { toggleFriendList } = useAppStore()

  const handleSeatClick = () => {
    playSoundClick()

    toggleFriendList(true)
  }

  return (
    <div
      className={twMerge(
        'relative h-full min-w-[200px] cursor-pointer items-center justify-center overflow-visible rounded-lg bg-gray-750 p-0.5 transition-all',
        'group'
      )}
      onClick={handleSeatClick}
      onMouseEnter={playSoundHover}
    >
      {children}
    </div>
  )
}
