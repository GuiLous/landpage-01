import { BiSolidJoystick } from 'react-icons/bi'
import { twMerge } from 'tailwind-merge'

import { LobbyGameType } from './LobbyGameTypeWrapper'

interface LobbyHeaderProps {
  activeTab: LobbyGameType
}

export function LobbyHeader({ activeTab }: LobbyHeaderProps) {
  return (
    <header className="mb-5 flex-initial items-center gap-3">
      <BiSolidJoystick
        className={twMerge(
          'text-[34px] text-white',
          '3xl:text-3xl',
          'ultrawide:text-6xl'
        )}
      />

      <div className="gap-2">
        <h2
          className={twMerge(
            'text-xl font-light uppercase text-white',
            '3xl:text-lg',
            'ultrawide:text-3xl'
          )}
        >
          {activeTab === 'RANQUEADA 5X5' && 'Suba de nível e'}
          {activeTab === 'PERSONALIZADA' && 'Escolha seu campo de batalha e'}
        </h2>
        <h2
          className={twMerge(
            'text-xl font-semibold uppercase text-white',
            '3xl:text-lg',
            'ultrawide:text-3xl'
          )}
        >
          {' '}
          {activeTab === 'RANQUEADA 5X5' && 'fique entre os melhores'}
          {activeTab === 'PERSONALIZADA' && ' desafie seus amigos'}
        </h2>
      </div>
    </header>
  )
}
