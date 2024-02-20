'use client'

import { RxTriangleUp } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'

import { GAME_TYPES, GAME_TYPES_AVAILABLE } from '@/constants'

import { Badge } from '@/components/shared'

import { useAudio } from '@/hooks'

import { LobbyGameType } from './LobbyGameTypeWrapper'

const buttonHoverUrl = '/assets/audios/button_hover.mp3'
const buttonClickUrl = '/assets/audios/click.mp3'

export interface LobbyGameTypeProps {
  activeTab?: LobbyGameType
  setActiveTab: (state: LobbyGameType) => void
}

export function LobbyGameType({
  activeTab = 'RANQUEADA 5X5',
  setActiveTab,
}: LobbyGameTypeProps) {
  const playSoundHover = useAudio(buttonHoverUrl)
  const playSoundClick = useAudio(buttonClickUrl)

  const handlePlaySound = (gameType: string, event: 'click' | 'mouseEnter') => {
    if (GAME_TYPES_AVAILABLE.includes(gameType) && activeTab !== gameType) {
      if (event === 'click') {
        playSoundClick()
        setActiveTab(gameType as LobbyGameType)
      }

      playSoundHover()
    }
  }

  return (
    <nav className="relative flex w-full flex-initial">
      {GAME_TYPES.map((gameType) => (
        <div
          key={gameType}
          className={twMerge(
            'items-center cursor-pointer justify-center gap-3 border-b border-b-gray-400 pb-[1.125rem]',
            'group',
            '3xl:pb-4',
            'ultrawide:border-b-2',
            activeTab === gameType && 'border-b-purple-400 cursor-default',
            !GAME_TYPES_AVAILABLE.includes(gameType) && 'cursor-default'
          )}
          onClick={() => handlePlaySound(gameType, 'click')}
          onMouseEnter={() => handlePlaySound(gameType, 'mouseEnter')}
        >
          {activeTab === gameType && (
            <div
              className={twMerge(
                'absolute -bottom-[12px] max-w-fit justify-center',
                'ultrawide:-bottom-[17px]'
              )}
            >
              <RxTriangleUp
                className={twMerge(
                  'text-[32px] text-purple-400',
                  'ultrawide:text-5xl'
                )}
              />
            </div>
          )}

          <h3
            className={twMerge(
              'text-lg uppercase text-gray-400 transition-colors',
              '3xl:text-base',
              'ultrawide:text-2xl',
              activeTab === gameType && 'text-purple-400 font-medium',
              GAME_TYPES_AVAILABLE.includes(gameType) &&
                'group-hover:text-purple-400',
              !GAME_TYPES_AVAILABLE.includes(gameType) && 'text-gray-400'
            )}
          >
            {gameType}
          </h3>

          {!GAME_TYPES_AVAILABLE.includes(gameType) && (
            <Badge variant="highlight" className="uppercase">
              Em breve
            </Badge>
          )}
        </div>
      ))}
    </nav>
  )
}
