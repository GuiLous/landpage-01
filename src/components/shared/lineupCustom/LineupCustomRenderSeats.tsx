'use client'

import { useCallback, useState } from 'react'

import { Friend } from '@/store/friendStore'
import { useLobbyStore } from '@/store/lobbyStore'

import { PlayerSide, lobbyApi } from '@/modelsApi'

import { useAudio, useAuth, useShowErrorToast } from '@/hooks'

import { LineupCustomSeat } from './LineupCustomSeat'
import { SideType } from './LineupCustomSide'

const buttonHoverUrl = '/assets/audios/button_hover.mp3'
const buttonClickUrl = '/assets/audios/click.mp3'

interface LineupCustomRenderSeatsProps {
  players?: Friend[]
  isUserPlayerSide: boolean
  side: SideType
}

const sideConvert = {
  Defensores: 'def_players_ids',
  Atacantes: 'atk_players_ids',
  Observadores: 'spec_players_ids',
}

export function LineupCustomRenderSeats({
  players = [],
  isUserPlayerSide,
  side,
}: LineupCustomRenderSeatsProps) {
  const { lobby } = useLobbyStore()

  const auth = useAuth()

  const showErrorToast = useShowErrorToast()

  const playSoundHover = useAudio(buttonHoverUrl)
  const playSoundClick = useAudio(buttonClickUrl)

  const [isFetching, setIsFetching] = useState(false)

  const changePlayerSide = useCallback(async () => {
    if (!auth?.token || !lobby?.id || !auth?.id || isUserPlayerSide) return

    setIsFetching(true)
    const response = await lobbyApi.switchPlayerSeat(
      auth.token,
      lobby.id,
      auth.id,
      sideConvert[side] as PlayerSide,
      {
        cache: 'no-cache',
      }
    )

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)
    }

    setIsFetching(false)
  }, [auth?.id, auth?.token, lobby?.id, showErrorToast, side, isUserPlayerSide])

  const handlePlaySoundClick = () => {
    if (isFetching) return

    playSoundClick()
    changePlayerSide()
  }

  return (
    players.length < 5 && (
      <LineupCustomSeat
        playSoundClick={handlePlaySoundClick}
        playSoundHover={playSoundHover}
        isUserPlayerSide={isUserPlayerSide}
      />
    )
  )
}
