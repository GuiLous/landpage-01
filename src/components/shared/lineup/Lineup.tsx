'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Friend } from '@/store/friendStore'
import { useLobbyStore } from '@/store/lobbyStore'
import { useUserStore } from '@/store/userStore'

import { lobbyApi } from '@/modelsApi'

import { useAudio, useAuth, useShowErrorToast } from '@/hooks'

import { LineupHiddenBox } from './LineupHiddenBox'
import { LineupPlayBtn } from './LineupPlayBtn'
import { LineupPlayerCard } from './LineupPlayerCard'
import { LineupSeat } from './LineupSeat'

const buttonHoverUrl = '/assets/audios/button_hover.mp3'
const buttonClickUrl = '/assets/audios/click.mp3'

interface LineupProps {
  maxPlayers?: number
}

export function Lineup({ maxPlayers = 5 }: LineupProps) {
  const { user } = useUserStore()
  const { lobby } = useLobbyStore()

  const playSoundHover = useAudio(buttonHoverUrl)
  const playSoundClick = useAudio(buttonClickUrl)

  const auth = useAuth()

  const showErrorToast = useShowErrorToast()

  const [lineup, setLineup] = useState<Friend[]>([])

  const userPlayer = lobby?.players?.find(
    (player) => player.user_id === user?.id
  )

  const otherPlayers = useMemo<Friend[]>(() => {
    return lobby?.players?.filter((player) => player.user_id !== user?.id) || []
  }, [lobby, user])

  const isOwner = lobby?.owner_id === userPlayer?.user_id

  const handleRemove = useCallback(
    async (player: Friend) => {
      if (lobby?.queue || !auth?.token || !lobby) return

      const response = await lobbyApi.removePlayer(
        auth.token,
        lobby.id,
        player.user_id
      )

      if (response.errorMsg) {
        showErrorToast(response.errorMsg)
      }
    },
    [lobby, showErrorToast, auth?.token]
  )

  const renderCloseButton = useCallback(
    (player: Friend) => {
      if (otherPlayers && otherPlayers.length < 1) return false
      else if (player?.user_id === userPlayer?.user_id || isOwner)
        return () => handleRemove(player)
      else return false
    },
    [handleRemove, isOwner, otherPlayers, userPlayer]
  )

  const renderPlayerCard = useCallback(
    (player: Friend) => {
      const closeButton = renderCloseButton(player)
      return (
        <LineupPlayerCard
          player={player}
          onClose={!lobby?.queue && closeButton}
          playSoundClick={playSoundClick}
          playSoundHover={playSoundHover}
        />
      )
    },
    [renderCloseButton, lobby?.queue, playSoundClick, playSoundHover]
  )

  const fillSeats = useCallback(() => {
    if (!userPlayer || !otherPlayers) return

    const lineupList: Friend[] = Array.from(Array(maxPlayers))
    const fillOrder = [1, 3, 0, 4]
    lineupList[2] = userPlayer

    for (let index = 0; index < otherPlayers.length; index++) {
      const player = otherPlayers[index]
      lineupList[fillOrder[index]] = player
    }

    setLineup(lineupList)
  }, [maxPlayers, otherPlayers, userPlayer])

  useEffect(() => {
    fillSeats()
  }, [fillSeats])

  return (
    <div
      className={twMerge(
        'h-full items-center gap-[1.125rem]',
        '3xl:gap-3.5',
        'ultrawide:gap-6'
      )}
    >
      {lineup.map((player, index) => (
        <div
          key={player ? player.user_id : `seat-${index}`}
          className={twMerge(
            'flex-col items-center gap-10 h-[95%]',
            '3xl:gap-7',
            index === 2 && 'h-full'
          )}
        >
          {player ? (
            renderPlayerCard(player)
          ) : (
            <LineupSeat
              playSoundClick={playSoundClick}
              playSoundHover={playSoundHover}
            />
          )}

          {index === 2 ? (
            <LineupPlayBtn isOwner={isOwner} />
          ) : (
            <LineupHiddenBox />
          )}
        </div>
      ))}
    </div>
  )
}
