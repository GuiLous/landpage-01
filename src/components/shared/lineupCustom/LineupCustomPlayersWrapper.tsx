'use client'

import { useLobbyStore } from '@/store/lobbyStore'

import { useAuth } from '@/hooks'

import { LineupCustomSide } from './LineupCustomSide'

export function LineupCustomPlayersWrapper() {
  const { lobby } = useLobbyStore()

  const auth = useAuth()

  const userDefPlayer = lobby?.def_players?.find(
    (player) => player.user_id === auth?.id
  )

  const userAtkPlayer = lobby?.atk_players?.find(
    (player) => player.user_id === auth?.id
  )

  const userSpecPlayer = lobby?.spec_players?.find(
    (player) => player.user_id === auth?.id
  )

  return (
    lobby && (
      <div className="justify-center gap-6">
        <LineupCustomSide
          owner_id={lobby.owner_id}
          players={lobby.def_players}
          isUserPlayerSide={!!userDefPlayer}
        />
        <LineupCustomSide
          owner_id={lobby.owner_id}
          side="Atacantes"
          players={lobby.atk_players}
          isUserPlayerSide={!!userAtkPlayer}
        />
        <LineupCustomSide
          owner_id={lobby.owner_id}
          side="Observadores"
          players={lobby.spec_players}
          isUserPlayerSide={!!userSpecPlayer}
        />
      </div>
    )
  )
}
