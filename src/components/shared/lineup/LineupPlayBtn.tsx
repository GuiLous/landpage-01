import { useCallback, useEffect, useState } from 'react'
import { MdBlock } from 'react-icons/md'
import { RiCloseFill } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'

import { formatSecondsToMinutes } from '@/functions'

import { storageService } from '@/services'

import { useAppDispatch, useAppSelector } from '@/store'
import { addToast } from '@/store/slices/appSlice'

import { lobbyApi, preMatchApi } from '@/api'

import { Button, Timer } from '@/components/shared'

import { useAudio } from '@/hooks'

import matchFoundAudio from '@/assets/audios/match_found.ogg'

interface LineupPlayBtnProps {
  isOwner: boolean
}

export function LineupPlayBtn({ isOwner }: LineupPlayBtnProps) {
  const lobby = useAppSelector((state) => state.lobby)
  const { user } = useAppSelector((state) => state.user)
  const { preMatch } = useAppSelector((state) => state.preMatch)

  const dispatch = useAppDispatch()

  const [toggle] = useAudio(matchFoundAudio)

  const [playAudio, setPlayAudio] = useState(false)
  const [openMatchFoundModal, setOpenMatchFoundModal] = useState(false)

  const userToken = storageService.get('token')

  const isInQueue = lobby.queue
    ? !user?.match_id && !lobby.restriction_countdown
    : false

  const isRestricted = !!(lobby.restriction_countdown && !user?.match_id)

  const isInMatch = !!user?.match_id

  const handleQueue = useCallback(
    async (action: 'start' | 'cancel') => {
      if (lobby.restriction_countdown || lobby.restriction_countdown === 0)
        return

      if (preMatch || user?.match_id || !userToken) return

      if (action === 'start' && !isOwner) return

      let response = null

      if (action === 'start') {
        response = await lobbyApi.startQueue(userToken, lobby.id)
      } else {
        response = await lobbyApi.cancelQueue(userToken, lobby.id)
      }

      if (response.errorMsg) {
        dispatch(
          addToast({
            content: response.errorMsg,
            variant: 'error',
          })
        )
      }
    },
    [dispatch, isOwner, lobby, preMatch, user, userToken]
  )

  const handleCancelQueue = useCallback(() => {
    setPlayAudio(false)
    handleQueue('cancel')
  }, [handleQueue])

  const handleStartQueue = useCallback(() => {
    handleQueue('start')
    setPlayAudio(true)
  }, [handleQueue])

  const lockIn = useCallback(async () => {
    const userToken = storageService.get('token')

    if (!userToken) return

    let response = null

    response = await preMatchApi.playerLockIn(userToken)

    if (response.errorMsg) {
      dispatch(
        addToast({
          content: response.errorMsg,
          variant: 'error',
        })
      )
    }
  }, [dispatch])

  const onMatchFound = useCallback(() => {
    if (preMatch && preMatch.state === 'lock_in') {
      if (playAudio) {
        toggle()
        setPlayAudio(false)
      }
      setOpenMatchFoundModal(true)
    } else setOpenMatchFoundModal(false)
  }, [playAudio, preMatch, toggle])

  useEffect(() => {
    if (preMatch && preMatch.state === 'pre_start') lockIn()
  }, [preMatch?.state, lockIn, preMatch])

  useEffect(() => {
    onMatchFound()
  }, [onMatchFound])

  return (
    <Button.Root
      queued={isInQueue}
      restricted={isRestricted}
      disabled={(!isOwner && !lobby.queue) || !!preMatch || isInMatch}
      className={twMerge(
        'group max-h-[73px] min-h-[73px] 3xl:min-h-[53px]  w-full gap-3 rounded-lg p-0 3xl:p-1',
        isInQueue && 'hover:bg-red-500'
      )}
      onClick={lobby?.queue_time ? handleCancelQueue : handleStartQueue}
    >
      {!isRestricted && !isInQueue && (
        <Button.Content className="text-[1.75rem] font-bold uppercase 3xl:text-2xl">
          Jogar
        </Button.Content>
      )}

      {isRestricted && lobby.restriction_countdown && (
        <Button.Content>
          <span className="text-sm font-semibold uppercase 3xl:text-xs 3xl:leading-none">
            Grupo com restrição
          </span>

          <div className="items-center justify-center gap-1 text-lg font-bold uppercase">
            <MdBlock className="text-white" />
            <Timer initialTime={lobby.restriction_countdown} reverse />
          </div>
        </Button.Content>
      )}

      {!isRestricted && isInQueue && (
        <Button.Content className="flex h-full w-full flex-col overflow-hidden text-[1.75rem] font-bold uppercase 3xl:text-2xl">
          {lobby?.queue_time && (
            <div className="items-center justify-center transition-all group-hover:-mt-[73px] group-hover:opacity-0">
              {formatSecondsToMinutes(lobby.queue_time)}
            </div>
          )}

          <div className="hidden items-center justify-center gap-1.5 opacity-0 group-hover:flex group-hover:opacity-100">
            <Button.Icon icon={RiCloseFill} size={28} />
            <span className="text-[1.375rem] font-bold uppercase">
              Cancelar
            </span>
          </div>
        </Button.Content>
      )}
    </Button.Root>
  )
}
