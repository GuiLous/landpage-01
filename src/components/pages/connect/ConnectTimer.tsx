import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import { Timer } from '@/components/shared'

const loadingGif = '/assets/images/loading.gif'

interface ConnectTimerProps {
  timeLeft?: number
}

export function ConnectTimer({ timeLeft }: ConnectTimerProps) {
  return (
    <div className="justify-end gap-3.5">
      <span
        className={twMerge('text-2xl font-semibold text-white', '3xl:text-xl')}
      >
        <Timer initialTime={timeLeft || 1} reverse />
      </span>

      <Image
        src={loadingGif}
        alt="Loading gif"
        className={twMerge('w-12', '3xl:w-9')}
      />
    </div>
  )
}
