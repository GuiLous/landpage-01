import { GoClock } from 'react-icons/go'
import { twMerge } from 'tailwind-merge'

import { CountdownClock, CustomIcon } from '@/components/shared'

interface StoreRotationTimerProps {
  nextRotation: number
}

export function StoreRotationTimer({ nextRotation }: StoreRotationTimerProps) {
  return (
    <section className="flex-initial items-center justify-between">
      <p className={twMerge('text-xl font-semibold uppercase', '3xl:text-lg')}>
        {' '}
        Ofertas por <span className="text-purple-300">tempo limitado</span>
      </p>

      {nextRotation > 0 && (
        <div className="max-w-fit flex-initial items-center gap-1.5">
          <CustomIcon
            icon={GoClock}
            className={twMerge('text-lg', '3xl:text-base')}
          />

          <span className={twMerge('text-xl font-semibold', '3xl:text-lg')}>
            <CountdownClock endTime={nextRotation} />
          </span>
        </div>
      )}
    </section>
  )
}
