/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { PlayerRanking } from '@/functions'

import { Player } from '@/store/matchStore'

import { useAudio, useAuth } from '@/hooks'

import { FieldsTableType } from './RankingTableHeader'
import { RankingTableRow } from './RankingTableRow'

const buttonHoverUrl = '/assets/audios/button_hover.mp3'
const buttonClickUrl = '/assets/audios/click.mp3'

interface RankingTableBodyProps {
  players?: PlayerRanking[]
  fieldsColumn: FieldsTableType[]
}

export function RankingTableBody({
  players = [],
  fieldsColumn,
}: RankingTableBodyProps) {
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
      {players.map((player, index) => (
        <RankingTableRow
          key={index}
          fieldsColumn={fieldsColumn}
          player={player}
          selectedPlayer={selectedPlayer}
          setSelectedPlayer={setSelectedPlayer}
          onClick={() =>
            player.user_id === auth?.id
              ? handleRedirectToProfile()
              : handleOpenMenu(player as unknown as Player)
          }
          onMouseEnter={playSoundHover}
          isLastRow={index === players.length - 1}
        />
      ))}
    </tbody>
  )
}
