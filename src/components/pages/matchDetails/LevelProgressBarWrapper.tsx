'use client'

import { twMerge } from 'tailwind-merge'

import { useLobbyStore } from '@/store/lobbyStore'
import { Progress } from '@/store/matchStore'

import { LevelProgressBar } from '@/components/shared'

export function LevelProgressBarWrapper(props: Progress) {
  const { lobby } = useLobbyStore()

  return (
    lobby?.mode === 'competitive' && (
      <div
        className={twMerge(
          'min-h-[82px] min-w-[38%] max-w-fit items-center rounded bg-gray-800/80 px-3.5',
          '3xl:max-w-full'
        )}
      >
        <LevelProgressBar {...props} />
      </div>
    )
  )
}
