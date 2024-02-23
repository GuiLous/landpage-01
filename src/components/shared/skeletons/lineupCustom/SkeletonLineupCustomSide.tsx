import { twMerge } from 'tailwind-merge'

import { SideType } from '@/components/shared/lineupCustom/LineupCustomSide'

import { SkeletonLineupCustomSeat } from './SkeletonLineupCustomSeat'

interface SkeletonLineupCustomSideProps {
  side?: SideType
}

export function SkeletonLineupCustomSide({
  side = 'Defensores',
}: SkeletonLineupCustomSideProps) {
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
        {Array.from(Array(5)).map((_, index) => (
          <SkeletonLineupCustomSeat key={index} />
        ))}
      </ul>
    </div>
  )
}
