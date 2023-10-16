import { RiCloseFill } from 'react-icons/ri'

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
      className="absolute right-4 top-4 w-4 max-w-fit cursor-pointer items-center gap-2.5 overflow-hidden transition-all hover:w-full 3xl:right-3 3xl:top-3 3xl:gap-2"
      onClick={onClose}
    >
      <RiCloseFill className="text-sm text-white 3xl:text-xs" />
      <span className="uppercase text-white 3xl:text-sm">{closeLabel}</span>
    </div>
  )
}
