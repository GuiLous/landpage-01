import { RiCloseFill } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'

interface LineupPlayerCardCloseBtnProps {
  onClose: () => Promise<void>
  closeLabel: string | null
}

export function LineupPlayerCardCloseBtn({
  onClose,
  closeLabel,
}: LineupPlayerCardCloseBtnProps) {
  return (
    <div
      className={twMerge(
        'absolute right-4 top-4 w-6 max-w-fit cursor-pointer items-center gap-1.5 overflow-hidden transition-all',
        'hover:w-full',
        '3xl:right-3 3xl:top-3 3xl:gap-2'
      )}
      onClick={onClose}
    >
      <RiCloseFill className="min-w-fit text-2xl text-white" />

      <span className={twMerge('uppercase text-white', '3xl:text-sm')}>
        {closeLabel}
      </span>
    </div>
  )
}
