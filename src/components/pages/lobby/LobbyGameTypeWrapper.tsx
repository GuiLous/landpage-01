'use client'

import { useCallback, useEffect, useState } from 'react'

import { useLobbyStore } from '@/store/lobbyStore'
import { GameType } from '@/store/matchStore'

import { lobbyApi } from '@/modelsApi'

import { Lineup, LineupCustom, SkeletonLineupCustom } from '@/components/shared'

import { useAuth } from '@/hooks'

import { LobbyGameType } from './LobbyGameType'
import { LobbyHeader } from './LobbyHeader'

export type LobbyGameType = 'TDM 5X5' | 'RANQUEADA 5X5' | 'PERSONALIZADA'

const gameTypeConvert = {
  competitive: 'RANQUEADA 5X5',
  custom: 'PERSONALIZADA',
}
export function LobbyGameTypeWrapper() {
  const { lobby } = useLobbyStore()

  const auth = useAuth()

  const [activeTab, setActiveTab] = useState<LobbyGameType>(
    lobby?.mode
      ? (gameTypeConvert[lobby.mode] as LobbyGameType)
      : 'RANQUEADA 5X5'
  )
  const [isFetching, setIsFetching] = useState(true)

  const updateLobbyType = useCallback(
    async (mode: GameType) => {
      if (!auth?.token || !lobby?.id) return

      await lobbyApi.switchMode(auth.token, lobby.id, mode)

      if (activeTab === 'PERSONALIZADA') setIsFetching(false)
    },
    [auth?.token, lobby?.id, activeTab]
  )

  useEffect(() => {
    updateLobbyType(activeTab === 'RANQUEADA 5X5' ? 'competitive' : 'custom')
  }, [activeTab, updateLobbyType])

  useEffect(() => {
    if (lobby?.mode) {
      setActiveTab(gameTypeConvert[lobby.mode] as LobbyGameType)
    }
  }, [lobby?.mode])

  return (
    <>
      <LobbyHeader activeTab={activeTab} />

      <LobbyGameType activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'RANQUEADA 5X5' && <Lineup />}
      {activeTab === 'PERSONALIZADA' && isFetching && <SkeletonLineupCustom />}
      {activeTab === 'PERSONALIZADA' && !isFetching && <LineupCustom />}
    </>
  )
}
