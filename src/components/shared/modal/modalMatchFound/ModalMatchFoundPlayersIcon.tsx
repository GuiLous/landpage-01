import { FaUser } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'

import { usePreMatchStore } from '@/store/preMatchStore'

export function ModalMatchFoundPlayersIcon() {
  const preMatch = usePreMatchStore.getState().preMatch

  const playersLeft = preMatch
    ? preMatch.players_total - preMatch.players_ready_count
    : 0

  const renderPlayers = Array(preMatch && preMatch.players_total).fill(null)

  return (
    <div className="justify-center gap-3">
      {renderPlayers
        .map((_, index) => (
          <div
            className="min-h-[44px] min-w-[44px] max-w-fit flex-initial items-center justify-center rounded border border-white"
            key={index}
          >
            <FaUser
              className={twMerge(
                'text-3xl text-white',
                index < playersLeft && 'opacity-50'
              )}
            />
          </div>
        ))
        .reverse()}
    </div>
  )
}
