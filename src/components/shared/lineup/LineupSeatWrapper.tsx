import { RiCloseFill } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'

export function LineupSeatWrapper() {
  return (
    <>
      <div className="relative z-10 h-full w-full items-center justify-center rounded-lg bg-gray-750">
        <RiCloseFill
          className={twMerge(
            'text-gray-300 text-4xl text-opacity-50 transition-all',
            'group-hover:rotate-45 group-hover:text-purple-400',
            'ultrawide:text-7xl'
          )}
        />
      </div>
      <div
        className={twMerge(
          'absolute bottom-full left-0 right-0 top-0 z-0 rounded-lg bg-gradient_seat transition-all',
          'group-hover:bottom-0'
        )}
      />
    </>
  )
}
