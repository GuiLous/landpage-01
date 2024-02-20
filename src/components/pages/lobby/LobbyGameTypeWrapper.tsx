'use client'

import { useState } from 'react'

import { Lineup, LineupCustom } from '@/components/shared'

import { LobbyGameType } from './LobbyGameType'
import { LobbyHeader } from './LobbyHeader'

export type LobbyGameType = 'TDM 5X5' | 'RANQUEADA 5X5' | 'PERSONALIZADA'

export function LobbyGameTypeWrapper() {
  const [activeTab, setActiveTab] = useState<LobbyGameType>('RANQUEADA 5X5')

  return (
    <>
      <LobbyHeader activeTab={activeTab} />

      <LobbyGameType activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'RANQUEADA 5X5' && <Lineup />}
      {activeTab === 'PERSONALIZADA' && <LineupCustom />}
    </>
  )
}
