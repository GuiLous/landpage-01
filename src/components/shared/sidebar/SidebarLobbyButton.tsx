'use client'

import { PiHouseFill } from 'react-icons/pi'

import { formatSecondsToMinutes } from '@/functions'

import { useAppSelector } from '@/store'

import { Button } from '../button'
import { Link } from '../link/Link'
import { Timer } from '../timer/Timer'

export function SidebarLobbyButton() {
  const lobby = useAppSelector((state) => state.lobby)
  const { user } = useAppSelector((state) => state.user)

  const isInQueue = lobby.queue
    ? !user?.match_id && !lobby.restriction_countdown
    : false

  const isRestricted = !!(lobby.restriction_countdown && !user?.match_id)

  const isOnLobby =
    !lobby.queue && !user?.match_id && !lobby.restriction_countdown

  const getButtonLabel = () => {
    if (user?.match_id) return 'Em partida'

    if (isOnLobby) return 'Lobby'

    if (isInQueue) return 'Na fila'

    if (isRestricted) return 'Restrito'
  }

  return (
    <div className="px-7 3xl:px-6">
      <Button.Root
        asChild
        queued={isInQueue}
        restricted={isRestricted}
        className="max-h-10 w-full justify-start gap-3 px-3"
      >
        <Link
          href={
            user?.match_id
              ? `perfil/${user?.id}/partidas/${user?.match_id}`
              : '/jogar'
          }
        >
          <Button.Icon icon={PiHouseFill} size={19} />

          <Button.Content className="text-sm font-semibold capitalize">
            {getButtonLabel()}
          </Button.Content>

          <div className="justify-end">
            <Button.Content className="text-sm font-semibold capitalize">
              {isInQueue &&
                lobby.queue_time &&
                formatSecondsToMinutes(lobby.queue_time)}

              {isRestricted && lobby.restriction_countdown && (
                <Timer initialTime={lobby.restriction_countdown} reverse />
              )}
            </Button.Content>
          </div>
        </Link>
      </Button.Root>
    </div>
  )
}
