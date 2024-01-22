import Link from 'next/link'
import { PiHouseFill } from 'react-icons/pi'
import { twMerge } from 'tailwind-merge'

import { formatSecondsToMinutes } from '@/utils'

import { useLobbyStore } from '@/store/lobbyStore'
import { useUserStore } from '@/store/userStore'

import { Button, Timer } from '@/components/shared'

export function SidebarLobbyButton() {
  const lobby = useLobbyStore.getState().lobby
  const user = useUserStore.getState().user

  const isInQueue = lobby?.queue
    ? !user?.match_id && !lobby.restriction_countdown
    : false

  const isRestricted = !!(lobby?.restriction_countdown && !user?.match_id)

  const isOnLobby =
    !lobby?.queue && !user?.match_id && !lobby?.restriction_countdown

  const isIsMatch = user?.match_id

  const getButtonLabel = () => {
    if (user?.match_id) return 'Em partida'

    if (isOnLobby) return 'Lobby'

    if (isInQueue) return 'Na fila'

    if (isRestricted) return 'Restrito'
  }

  return (
    <div className={twMerge('px-7', '3xl:px-6')}>
      <Button.Root
        asChild
        queued={isInQueue || !!isIsMatch}
        restricted={isRestricted}
        className="max-h-10 w-full justify-start gap-3 px-3"
        id="step03"
      >
        <Link
          href={
            user?.match_id
              ? `/perfil/${user?.id}/partidas/${user?.match_id}`
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
                lobby?.queue_time !== 0 &&
                lobby?.queue_time &&
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
