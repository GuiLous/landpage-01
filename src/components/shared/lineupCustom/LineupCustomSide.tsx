import { twMerge } from 'tailwind-merge'

import { Friend } from '@/store/friendStore'

import { LineupCustomRenderPlayersCard } from './LineupCustomRenderPlayersCard'
import { LineupCustomRenderSeats } from './LineupCustomRenderSeats'

export type SideType = 'Defensores' | 'Atacantes' | 'Observadores'

interface LineupCustomSideProps {
  side?: SideType
  players?: Friend[]
  owner_id: number
}

export function LineupCustomSide({
  side = 'Defensores',
  players = [],
  owner_id,
}: LineupCustomSideProps) {
  return (
    <div className="flex-col gap-1">
      <div
        className={twMerge(
          'max-h-[38px] items-center justify-center rounded-t bg-cyan-400/40 backdrop-blur-sm',
          side === 'Atacantes' && 'bg-red-400/40',
          side === 'Observadores' && 'bg-white/30',
          'ultrawide:max-h-16'
        )}
      >
        <h2
          className={twMerge(
            'text-sm font-medium uppercase leading-none',
            'ultrawide:text-2xl'
          )}
        >
          {side}
        </h2>
      </div>

      <ul className={twMerge('flex w-full flex-1 flex-col gap-0.5')}>
        <LineupCustomRenderPlayersCard
          owner_id={owner_id}
          side={side}
          players={players}
        />

        <LineupCustomRenderSeats players={players} />
      </ul>
    </div>
  )
}
