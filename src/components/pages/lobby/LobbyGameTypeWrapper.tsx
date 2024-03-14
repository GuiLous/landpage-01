'use client'

import { useEffect, useState } from 'react'

import { useLobbyStore } from '@/store/lobbyStore'

import { Lineup, LineupCustom } from '@/components/shared'

import { LobbyGameType } from './LobbyGameType'
import { LobbyHeader } from './LobbyHeader'

export type LobbyType = 'TDM 5X5' | 'RANQUEADA 5X5' | 'PERSONALIZADA'

const gameTypeConvert = {
  competitive: 'RANQUEADA 5X5',
  custom: 'PERSONALIZADA',
}

export function LobbyGameTypeWrapper() {
  const { lobby } = useLobbyStore()

  const [activeTab, setActiveTab] = useState<LobbyType>(
    lobby?.mode ? (gameTypeConvert[lobby.mode] as LobbyType) : 'RANQUEADA 5X5'
  )

  useEffect(() => {
    if (lobby?.mode) {
      setActiveTab(gameTypeConvert[lobby.mode] as LobbyType)
    }
  }, [lobby?.mode])

  return (
    <>
      <LobbyHeader activeTab={activeTab} />

      <LobbyGameType activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'RANQUEADA 5X5' && <Lineup />}
      {activeTab === 'PERSONALIZADA' && <LineupCustom />}
    </>
  )
}
