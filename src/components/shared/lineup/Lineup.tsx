'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { storageService } from '@/services'

import { useAppSelector } from '@/store'
import { Friend } from '@/store/slices/friendSlice'

import { lobbyApi } from '@/api'

import { useShowErrorToast } from '@/hooks'

import { LineupHiddenBox } from './LineupHiddenBox'
import { LineupPlayBtn } from './LineupPlayBtn'
import { LineupPlayerCard } from './LineupPlayerCard'
import { LineupSeat } from './LineupSeat'

interface LineupProps {
  maxPlayers?: number
}

export function Lineup({ maxPlayers = 5 }: LineupProps) {
  const { user } = useAppSelector((state) => state.user)
  const lobby = useAppSelector((state) => state.lobby)

  const showErrorToast = useShowErrorToast()

  const [lineup, setLineup] = useState<Friend[]>([])

  const userPlayer = lobby.players?.find(
    (player) => player.user_id === user?.id
  )

  const otherPlayers = useMemo<Friend[]>(() => {
    return lobby.players?.filter((player) => player.user_id !== user?.id) || []
  }, [lobby, user])

  const isOwner = lobby.owner_id === userPlayer?.user_id

  const handleRemove = useCallback(
    async (player: Friend) => {
      const userToken = storageService.get('token')

      if (lobby.queue || !userToken) return

      const response = await lobbyApi.removePlayer(
        userToken,
        lobby.id,
        player.user_id
      )

      if (response.errorMsg) {
        showErrorToast(response.errorMsg)
      }
    },
    [lobby, showErrorToast]
  )

  const renderCloseLabel = useCallback(
    (player: Friend) => {
      if (otherPlayers && otherPlayers.length < 1) return null
      else if (player?.user_id === userPlayer?.user_id) return 'Sair'
      else if (isOwner) return 'Expulsar'
      else return null
    },
    [isOwner, otherPlayers, userPlayer]
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
      const closeLabel = renderCloseLabel(player)
      return (
        <LineupPlayerCard
          closeLabel={closeLabel}
          player={player}
          onClose={!lobby.queue && closeButton}
        />
      )
    },
    [renderCloseButton, renderCloseLabel, lobby]
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
    <div className="h-full items-center gap-[1.125rem] 3xl:gap-3.5">
      {lineup.map((player, index) => (
        <div
          key={player ? player.user_id : `seat-${index}`}
          className={twMerge(
            'flex-col items-center gap-10 3xl:gap-7 h-[95%]',
            index === 2 && 'h-full'
          )}
        >
          {player ? renderPlayerCard(player) : <LineupSeat />}

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
