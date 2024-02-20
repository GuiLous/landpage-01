'use client'

import { useLobbyStore } from '@/store/lobbyStore'

import { useAuth } from '@/hooks'

import { LineupCustomSide } from './LineupCustomSide'

export function LineupCustomPlayersWrapper() {
  const { lobby } = useLobbyStore()

  const auth = useAuth()

  const userPlayer = lobby?.players?.find(
    (player) => player.user_id === auth?.id
  )

  const defenders = []

  if (userPlayer) {
    defenders.push(userPlayer)
  }

  return (
    lobby && (
      <div className="justify-center gap-6">
        <LineupCustomSide owner_id={lobby.owner_id} players={defenders} />
        <LineupCustomSide
          owner_id={lobby.owner_id}
          side="Atacantes"
          players={[]}
        />
        <LineupCustomSide
          owner_id={lobby.owner_id}
          side="Observadores"
          players={[]}
        />
      </div>
    )
  )
}
