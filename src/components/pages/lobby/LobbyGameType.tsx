'use client'

import { useCallback } from 'react'
import { RxTriangleUp } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'

import { GAME_TYPES, GAME_TYPES_AVAILABLE } from '@/constants'

import { useLobbyStore } from '@/store/lobbyStore'
import { GameType } from '@/store/matchStore'
import { UserFeats, useUserStore } from '@/store/userStore'

import { lobbyApi } from '@/modelsApi'

import { Badge } from '@/components/shared'

import { useAudio, useAuth } from '@/hooks'

import { LobbyType } from './LobbyGameTypeWrapper'

const buttonHoverUrl = '/assets/audios/button_hover.mp3'
const buttonClickUrl = '/assets/audios/click.mp3'

export interface LobbyGameTypeProps {
  activeTab?: LobbyType
  setActiveTab: (state: LobbyType) => void
}

const gameTypeMapper = {
  'RANQUEADA 5X5': 'comp_lobby',
  PERSONALIZADA: 'custom_lobby',
  'TDM 5X5': '',
}

export function LobbyGameType({
  activeTab = 'RANQUEADA 5X5',
  setActiveTab,
}: LobbyGameTypeProps) {
  const { lobby } = useLobbyStore()
  const { user } = useUserStore()

  const auth = useAuth()

  const playSoundHover = useAudio(buttonHoverUrl)
  const playSoundClick = useAudio(buttonClickUrl)

  const isLobbyOwner = lobby?.owner_id === auth?.id

  const updateMatchType = useCallback(
    async (mode: GameType) => {
      if (!auth?.token || !lobby?.id) return

      await lobbyApi.switchMode(auth.token, lobby.id, mode)
    },
    [auth?.token, lobby?.id]
  )

  const handleClickAndMouseEnter = (
    gameType: string,
    event: 'click' | 'mouseEnter'
  ) => {
    if (
      GAME_TYPES_AVAILABLE.includes(gameType) &&
      user?.feats.includes(
        gameTypeMapper[gameType as LobbyType] as UserFeats
      ) &&
      activeTab !== gameType &&
      isLobbyOwner
    ) {
      if (event === 'click') {
        playSoundClick()

        updateMatchType(gameType === 'RANQUEADA 5X5' ? 'competitive' : 'custom')

        setActiveTab(gameType as LobbyType)
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
            'items-center justify-center gap-3 border-b border-b-gray-400 pb-[1.125rem]',
            'group',
            '3xl:pb-4',
            'ultrawide:border-b-2',
            isLobbyOwner && 'cursor-pointer',
            activeTab === gameType && 'border-b-purple-400 cursor-default',
            (!GAME_TYPES_AVAILABLE.includes(gameType) ||
              !user?.feats.includes(
                gameTypeMapper[gameType as LobbyType] as UserFeats
              )) &&
              'cursor-default'
          )}
          onClick={() => handleClickAndMouseEnter(gameType, 'click')}
          onMouseEnter={() => handleClickAndMouseEnter(gameType, 'mouseEnter')}
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
                user?.feats.includes(
                  gameTypeMapper[gameType as LobbyType] as UserFeats
                ) &&
                isLobbyOwner &&
                'group-hover:text-purple-400',
              (!GAME_TYPES_AVAILABLE.includes(gameType) ||
                !user?.feats.includes(
                  gameTypeMapper[gameType as LobbyType] as UserFeats
                )) &&
                'text-gray-400'
            )}
          >
            {gameType}
          </h3>

          {(!GAME_TYPES_AVAILABLE.includes(gameType) ||
            !user?.feats.includes(
              gameTypeMapper[gameType as LobbyType] as UserFeats
            )) && (
            <Badge variant="highlight" className="uppercase">
              Em breve
            </Badge>
          )}
        </div>
      ))}
    </nav>
  )
}
