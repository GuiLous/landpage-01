import { RiCloseFill } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'

interface LineupCustomSeatProps {
  playSoundClick: () => void
  playSoundHover: () => void
  isUserPlayerSide: boolean
}

export function LineupCustomSeat({
  playSoundClick,
  playSoundHover,
  isUserPlayerSide,
}: LineupCustomSeatProps) {
  return (
    <li
      className={twMerge(
        'flex max-h-16 max-w-full transition-colors flex-1 items-center justify-center bg-gray-500/60',
        'group',
        !isUserPlayerSide && 'hover:bg-gray-400',
        'last:rounded-b',
        'ultrawide:max-h-28',
        !isUserPlayerSide && 'cursor-pointer'
      )}
      onClick={!isUserPlayerSide ? playSoundClick : undefined}
      onMouseEnter={!isUserPlayerSide ? playSoundHover : undefined}
    >
      <button
        className={twMerge(
          'flex h-full flex-1 cursor-default items-center justify-center',
          !isUserPlayerSide && 'cursor-pointer'
        )}
      >
        <RiCloseFill
          className={twMerge(
            'text-gray-300 text-3xl text-opacity-50 transition-all',
            !isUserPlayerSide && 'group-hover:rotate-45',
            'ultrawide:text-6xl'
          )}
        />
      </button>
    </li>
  )
}
