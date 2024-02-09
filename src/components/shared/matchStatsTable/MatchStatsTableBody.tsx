'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { Player } from '@/store/matchStore'

import { useAudio, useAuth } from '@/hooks'

import { MatchStatsTableRow } from './MatchStatsTableRow'

const buttonHoverUrl = '/assets/audios/button_hover.mp3'
const buttonClickUrl = '/assets/audios/click.mp3'

interface MatchStatsTableBodyProps {
  players: Player[]
  userId: number
}

export function MatchStatsTableBody({
  players,
  userId,
}: MatchStatsTableBodyProps) {
  const playSoundHover = useAudio(buttonHoverUrl)
  const playSoundClick = useAudio(buttonClickUrl)

  const auth = useAuth()

  const router = useRouter()

  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)

  const handleRedirectToProfile = useCallback(() => {
    playSoundClick()
    return router.push(`/perfil/${auth?.id}`)
  }, [auth?.id, playSoundClick, router])

  const handleOpenMenu = useCallback(
    (player: Player) => {
      playSoundClick()
      setSelectedPlayer(player)
    },
    [playSoundClick]
  )

  return (
    <tbody>
      {players.map((player) => (
        <MatchStatsTableRow
          key={player.id}
          player={player}
          userId={userId}
          selectedPlayer={selectedPlayer}
          setSelectedPlayer={setSelectedPlayer}
          onClick={() =>
            player.user_id === auth?.id
              ? handleRedirectToProfile()
              : handleOpenMenu(player)
          }
          onMouseEnter={playSoundHover}
        />
      ))}
    </tbody>
  )
}
