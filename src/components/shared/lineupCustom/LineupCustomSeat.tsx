import { RiCloseFill } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'

interface LineupCustomSeatProps {
  playSoundClick: () => void
  playSoundHover: () => void
}

export function LineupCustomSeat({
  playSoundClick,
  playSoundHover,
}: LineupCustomSeatProps) {
  return (
    <li
      className={twMerge(
        'flex max-h-16 cursor-pointer max-w-full transition-colors flex-1 items-center justify-center bg-gray-500/60',
        'group',
        'hover:bg-gray-400',
        'last:rounded-b',
        'ultrawide:max-h-28'
      )}
      onClick={playSoundClick}
      onMouseEnter={playSoundHover}
    >
      <RiCloseFill
        className={twMerge(
          'text-gray-300 text-3xl text-opacity-50 transition-all',
          'group-hover:rotate-45 group-hover:text-purple-400',
          'ultrawide:text-6xl'
        )}
      />
    </li>
  )
}
