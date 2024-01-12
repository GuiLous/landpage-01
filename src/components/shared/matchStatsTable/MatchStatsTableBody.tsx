'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { revalidatePath } from '@/utils'

import { Player } from '@/store/matchStore'

import { useAuth } from '@/hooks'

import { MatchStatsTableRow } from './MatchStatsTableRow'

interface MatchStatsTableBodyProps {
  players: Player[]
  userId: number
}

export function MatchStatsTableBody({
  players,
  userId,
}: MatchStatsTableBodyProps) {
  const auth = useAuth()

  const router = useRouter()

  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)

  const handleRedirectToProfile = useCallback(() => {
    revalidatePath({ path: `/perfil/${auth?.id}` })
    return router.push(`/perfil/${auth?.id}`)
  }, [auth?.id, router])

  const handleOpenMenu = useCallback((player: Player) => {
    setSelectedPlayer(player)
  }, [])

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
        />
      ))}
    </tbody>
  )
}
