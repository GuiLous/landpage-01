import { RxTriangleUp } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'

import { GAME_TYPES, GAME_TYPES_AVAILABLE } from '@/constants'

import { Badge } from '@/components/shared'

interface LobbyGameTypeProps {
  activeTab?: 'TDM 5X5' | 'RANQUEADA 5X5' | 'PERSONALIZADA'
}

export function LobbyGameType({
  activeTab = 'RANQUEADA 5X5',
}: LobbyGameTypeProps) {
  return (
    <nav className="relative flex w-full flex-initial">
      {GAME_TYPES.map((gameType) => (
        <div
          key={gameType}
          className={twMerge(
            'items-center cursor-pointer justify-center gap-3 border-b border-b-gray-400 pb-[1.125rem]',
            '3xl:pb-4',
            activeTab === gameType && 'border-b-purple-400',
            !GAME_TYPES_AVAILABLE.includes(gameType) && 'cursor-default'
          )}
        >
          {activeTab === gameType && (
            <div className="absolute -bottom-[12px] max-w-fit justify-center">
              <RxTriangleUp className="text-purple-400" size={32} />
            </div>
          )}

          <h3
            className={twMerge(
              'text-lg uppercase text-white',
              '3xl:text-base',
              activeTab === gameType && 'text-purple-400 font-medium',
              !GAME_TYPES_AVAILABLE.includes(gameType) && 'text-gray-400'
            )}
          >
            {gameType}
          </h3>

          {!GAME_TYPES_AVAILABLE.includes(gameType) && (
            <Badge variant="highlight" className="uppercase">
              Em breve
            </Badge>
          )}
        </div>
      ))}
    </nav>
  )
}
