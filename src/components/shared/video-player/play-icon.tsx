import { Play } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

export function PlayIcon() {
  return (
    <div
      className={twMerge(
        'flex h-20 w-20 items-center justify-center rounded-full bg-blue-500'
      )}
    >
      <Play fill="white" />
    </div>
  )
}
