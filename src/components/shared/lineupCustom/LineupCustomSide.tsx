import { twMerge } from 'tailwind-merge'

import { Friend } from '@/store/friendStore'

import { LineupCustomRenderPlayersCard } from './LineupCustomRenderPlayersCard'
import { LineupCustomRenderSeats } from './LineupCustomRenderSeats'

export type SideType = 'Defensores' | 'Atacantes' | 'Observadores'

interface LineupCustomSideProps {
  side?: SideType
  players?: Friend[]
  owner_id: number
  isUserPlayerSide?: boolean
  userPlayerSide: SideType
}

export function LineupCustomSide({
  side = 'Defensores',
  players = [],
  owner_id,
  isUserPlayerSide = false,
  userPlayerSide,
}: LineupCustomSideProps) {
  const isBgGreen = isUserPlayerSide && userPlayerSide !== 'Observadores'
  const isBgRed = !isUserPlayerSide && userPlayerSide !== 'Observadores'
  const isBgGray = userPlayerSide === 'Observadores'

  return (
    <div className="flex-col gap-1">
      <div
        className={twMerge(
          'max-h-[38px] items-center justify-center rounded-t backdrop-blur-sm',
          isBgGreen && 'bg-cyan-400/40',
          isBgRed && 'bg-red-400/40',
          isBgGray && 'bg-white/30',
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

      <ul className={twMerge('flex w-full min-h-[34.5vh] flex-col gap-0.5')}>
        <LineupCustomRenderPlayersCard
          owner_id={owner_id}
          side={side}
          players={players}
          isUserPlayerSide={isUserPlayerSide}
          userPlayerSide={userPlayerSide}
        />

        <LineupCustomRenderSeats
          players={players}
          isUserPlayerSide={isUserPlayerSide}
          side={side}
        />
      </ul>
    </div>
  )
}
