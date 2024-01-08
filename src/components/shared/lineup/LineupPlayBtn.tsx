import { useCallback, useEffect, useMemo, useState } from 'react'
import { MdBlock } from 'react-icons/md'
import { RiCloseFill } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'

import { formatSecondsToMinutes } from '@/utils'

import { useLobbyStore } from '@/store/lobbyStore'
import { usePreMatchStore } from '@/store/preMatchStore'
import { useUserStore } from '@/store/userStore'

import { lobbyApi } from '@/modelsApi'

import { Button, ModalMatchFound, Timer } from '@/components/shared'

import { useAuth, useShowErrorToast } from '@/hooks'

import matchFoundAudioUrl from '@/assets/audios/match_found.ogg'

interface LineupPlayBtnProps {
  isOwner: boolean
}

export function LineupPlayBtn({ isOwner }: LineupPlayBtnProps) {
  const user = useUserStore.getState().user
  const lobby = useLobbyStore.getState().lobby
  const preMatch = usePreMatchStore.getState().preMatch

  const getAuth = useAuth()
  const auth = getAuth()

  const showErrorToast = useShowErrorToast()

  const [openMatchFoundModal, setOpenMatchFoundModal] = useState(false)

  const isInQueue = lobby?.queue
    ? !user?.match_id && !lobby.restriction_countdown
    : false

  const isRestricted = !!(lobby?.restriction_countdown && !user?.match_id)

  const isInMatch = !!user?.match_id

  const audio = useMemo(() => {
    return new Audio(matchFoundAudioUrl)
  }, [])

  const playSound = useCallback(() => {
    audio.play()
  }, [audio])

  const handleQueue = useCallback(
    async (action: 'start' | 'cancel') => {
      if (
        lobby?.restriction_countdown ||
        lobby?.restriction_countdown === 0 ||
        !lobby
      )
        return

      if (preMatch || user?.match_id || !auth?.token) return

      if (action === 'start' && !isOwner) return

      let response = null

      if (action === 'start') {
        response = await lobbyApi.startQueue(auth.token, lobby.id)
      } else {
        response = await lobbyApi.cancelQueue(auth.token, lobby.id)
      }

      if (response.errorMsg) {
        showErrorToast(response.errorMsg)
      }
    },
    [isOwner, lobby, preMatch, user, auth, showErrorToast]
  )

  const handleCancelQueue = useCallback(() => {
    handleQueue('cancel')
  }, [handleQueue])

  const handleStartQueue = useCallback(() => {
    handleQueue('start')
  }, [handleQueue])

  const onMatchFound = useCallback(() => {
    if (preMatch && !openMatchFoundModal) {
      playSound()
      setOpenMatchFoundModal(true)
    } else if ((preMatch && preMatch.ready && openMatchFoundModal) || !preMatch)
      setOpenMatchFoundModal(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preMatch, playSound])

  useEffect(() => {
    onMatchFound()
  }, [onMatchFound])

  return (
    <>
      <Button.Root
        queued={isInQueue}
        restricted={isRestricted}
        disabled={(!isOwner && !lobby?.queue) || !!preMatch || isInMatch}
        className={twMerge(
          'max-h-[73px] min-h-[73px] w-full gap-3 rounded-lg p-0',
          'group',
          '3xl:min-h-[53px] 3xl:p-1',
          isInQueue && 'hover:bg-red-500'
        )}
        onClick={lobby?.queue_time ? handleCancelQueue : handleStartQueue}
      >
        {!isRestricted && !isInQueue && (
          <Button.Content
            className={twMerge(
              'text-[1.75rem] font-bold uppercase',
              '3xl:text-2xl'
            )}
          >
            Jogar
          </Button.Content>
        )}

        {isRestricted && lobby.restriction_countdown && (
          <Button.Content>
            <span
              className={twMerge(
                'text-sm font-semibold uppercase',
                '3xl:text-xs 3xl:leading-none'
              )}
            >
              Grupo com restrição
            </span>

            <span className="flex w-full flex-1 items-center justify-center gap-1 text-lg font-bold uppercase">
              <MdBlock className="text-white" />
              <Timer initialTime={lobby.restriction_countdown} reverse />
            </span>
          </Button.Content>
        )}

        {!isRestricted && isInQueue && (
          <Button.Content
            className={twMerge(
              'flex h-full w-full flex-col overflow-hidden text-[1.75rem] font-bold uppercase',
              '3xl:text-2xl'
            )}
          >
            <span
              className={twMerge(
                'flex w-full flex-1 items-center justify-center transition-all',
                'group-hover:-mt-[73px] group-hover:opacity-0',
                '3xl:group-hover:-mt-[13px] 3xl:group-hover:max-h-[13px]'
              )}
            >
              {lobby?.queue_time !== 0 &&
                lobby?.queue_time &&
                formatSecondsToMinutes(lobby.queue_time)}

              {lobby?.queue_time === 0 && '00:00'}
            </span>

            <span
              className={twMerge(
                'hidden w-full flex-1 items-center justify-center gap-1.5 opacity-0',
                'group-hover:flex group-hover:opacity-100',
                '3xl:max-h-[53px]'
              )}
            >
              <Button.Icon icon={RiCloseFill} size={28} />
              <span className="text-[1.375rem] font-bold uppercase">
                Cancelar
              </span>
            </span>
          </Button.Content>
        )}
      </Button.Root>

      <ModalMatchFound
        open={openMatchFoundModal}
        setOpen={setOpenMatchFoundModal}
      />
    </>
  )
}
