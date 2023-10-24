import { twMerge } from 'tailwind-merge'

import { LobbyGameType, LobbyHeader } from '@/components/pages'

import { Lineup } from '@/components/shared'

export default function Play() {
  return (
    <main
      className={twMerge(
        'h-full flex-col items-center gap-10 bg-gray-1200',
        '3xl:gap-8'
      )}
    >
      <LobbyHeader />

      <LobbyGameType />

      <Lineup />
    </main>
  )
}
