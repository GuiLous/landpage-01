import { twMerge } from 'tailwind-merge'

import { lobbySteps } from '@/utils'

import {
  LobbyGameType,
  LobbyHeader,
  LobbyRenderModalWelcome,
} from '@/components/pages'

import { Lineup, Wizard } from '@/components/shared'

export default function Play() {
  return (
    <main
      className={twMerge(
        'h-full flex-col items-center gap-10 bg-gray-1200',
        '3xl:gap-8'
      )}
    >
      <Wizard steps={lobbySteps} page="lobby" />

      <LobbyHeader />

      <LobbyGameType />

      <Lineup />

      <LobbyRenderModalWelcome />
    </main>
  )
}
