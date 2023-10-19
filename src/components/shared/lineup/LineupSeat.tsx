import { RiCloseFill } from 'react-icons/ri'

import { useAppDispatch } from '@/store'
import { toggleFriendList } from '@/store/slices/appSlice'

export function LineupSeat() {
  const dispatch = useAppDispatch()

  const handleSeatClick = () => {
    dispatch(toggleFriendList(true))
  }

  return (
    <div
      className="group relative h-full min-w-[200px] cursor-pointer items-center justify-center overflow-visible rounded-lg bg-gray-750 p-0.5 transition-all"
      onClick={handleSeatClick}
    >
      <div className="relative z-10 h-full w-full items-center justify-center rounded-lg bg-gray-750">
        <RiCloseFill
          className="text-gray-300 text-opacity-50 transition-all group-hover:rotate-45 group-hover:text-purple-400"
          size={34}
        />
      </div>
      <div className="absolute bottom-full left-0 right-0 top-0 z-0 rounded-lg bg-gradient_seat transition-all group-hover:bottom-0" />
    </div>
  )
}
