'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { Player } from '@/store/slices/matchSlice'

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
  const getAuth = useAuth()
  const auth = getAuth()

  const router = useRouter()

  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)

  const handleRedirectToProfile = useCallback(() => {
    return router.push(`/perfil/${auth?.id}`)
  }, [auth, router])

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
