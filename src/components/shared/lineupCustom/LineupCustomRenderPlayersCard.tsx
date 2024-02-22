'use client'

import { useCallback, useMemo } from 'react'

import { Friend } from '@/store/friendStore'
import { useLobbyStore } from '@/store/lobbyStore'
import { useUserStore } from '@/store/userStore'

import { lobbyApi } from '@/modelsApi'

import { useAudio, useAuth, useShowErrorToast } from '@/hooks'

import { LineupCustomPlayerCard } from './LineupCustomPlayerCard'
import { SideType } from './LineupCustomSide'

const buttonHoverUrl = '/assets/audios/button_hover.mp3'
const buttonClickUrl = '/assets/audios/click.mp3'

interface LineupCustomRenderPlayersCardProps {
  players?: Friend[]
  side: SideType
  owner_id: number
}

export function LineupCustomRenderPlayersCard({
  players = [],
  side,
  owner_id,
}: LineupCustomRenderPlayersCardProps) {
  const { user } = useUserStore()
  const { lobby } = useLobbyStore()

  const playSoundHover = useAudio(buttonHoverUrl)
  const playSoundClick = useAudio(buttonClickUrl)

  const auth = useAuth()

  const showErrorToast = useShowErrorToast()

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

  return players.map((player) => (
    <LineupCustomPlayerCard
      key={player.user_id}
      player={player}
      side={side}
      isLobbyOwner={owner_id === player?.user_id}
      playSoundClick={playSoundClick}
      playSoundHover={playSoundHover}
      onClose={!lobby?.queue && renderCloseButton(player)}
    />
  ))
}
