'use client'

import { useCallback, useEffect, useState } from 'react'
import { MdBlock } from 'react-icons/md'
import { RiCloseFill } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'

import { formatSecondsToMinutes } from '@/utils'

import { useLobbyStore } from '@/store/lobbyStore'
import { usePreMatchStore } from '@/store/preMatchStore'
import { useUserStore } from '@/store/userStore'

import { CreateMatchPayloadType, lobbyApi, matchesApi } from '@/modelsApi'

import { Button, ModalMatchFound, Timer, Tooltip } from '@/components/shared'

import { useAudio, useAuth, useShowErrorToast } from '@/hooks'

const matchFoundAudioUrl = '/assets/audios/match_found.ogg'
const queueUrl = '/assets/audios/queue.mp3'

const attentionFavicon = '/assets/images/attentionFavicon.ico'

interface LineupPlayBtnProps {
  isOwner: boolean
  disabled?: boolean
  tooltipLabel?: string
  lobbyMode?: 'competitive' | 'custom'
}

export function LineupPlayBtn({
  isOwner,
  disabled = false,
  tooltipLabel = '',
  lobbyMode = 'competitive',
}: LineupPlayBtnProps) {
  const { user } = useUserStore()
  const { lobby } = useLobbyStore()
  const { preMatch } = usePreMatchStore()

  const playSoundClick = useAudio(queueUrl)
  const matchFoundAudio = useAudio(matchFoundAudioUrl)

  const [notificationClicked, setNotificationClicked] = useState(false)

  const auth = useAuth()

  const showErrorToast = useShowErrorToast()

  const [openMatchFoundModal, setOpenMatchFoundModal] = useState(false)

  const isInQueue = lobby?.queue
    ? !user?.match_id && !lobby.restriction_countdown
    : false

  const isRestricted = !!(lobby?.restriction_countdown && !user?.match_id)

  const isInMatch = !!user?.match_id

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
      if (action === 'start' && lobby.queue) return

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
    [isOwner, lobby, preMatch, user, auth?.token, showErrorToast]
  )

  const handleCreateMatch = useCallback(async () => {
    if (!auth?.token || !lobby) return

    const payload: CreateMatchPayloadType = {
      players_ids: lobby.players_ids,
      mode: lobby.mode,
      map_id: lobby.map_id,
      weapon: lobby.weapon,
      def_players_ids: lobby.def_players.map((player) => player.user_id),
      atk_players_ids: lobby.atk_players.map((player) => player.user_id),
      spec_players_ids: lobby.spec_players.map((player) => player.user_id),
    }

    const response = await matchesApi.create(auth.token, payload)

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)
    }
  }, [auth?.token, lobby, showErrorToast])

  const handleCancelQueue = useCallback(() => {
    handleQueue('cancel')
  }, [handleQueue])

  const handleStart = useCallback(() => {
    playSoundClick()

    if (lobbyMode === 'custom') return handleCreateMatch()

    handleQueue('start')
  }, [handleCreateMatch, handleQueue, lobbyMode, playSoundClick])

  const onMatchFound = useCallback(() => {
    if (preMatch && !openMatchFoundModal) {
      matchFoundAudio()
      setOpenMatchFoundModal(true)
    } else if ((preMatch && preMatch.ready && openMatchFoundModal) || !preMatch)
      setOpenMatchFoundModal(false)
    setNotificationClicked(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preMatch, matchFoundAudio])

  useEffect(() => {
    onMatchFound()
  }, [onMatchFound])

  useEffect(() => {
    const defaultFavicon = '/favicon.ico'
    let isDefaultFavicon = true
    let interval: NodeJS.Timeout

    const blinkFavicon = () => {
      const link = (document.querySelector("link[rel*='icon']") ||
        document.createElement('link')) as HTMLLinkElement

      if (link) {
        link.rel = 'icon'
        link.href = isDefaultFavicon ? defaultFavicon : attentionFavicon
        const head = document.head || document.getElementsByTagName('head')[0]
        head
          .querySelectorAll("link[rel*='icon']")
          .forEach((el) => head.removeChild(el))
        head.appendChild(link)
        isDefaultFavicon = !isDefaultFavicon
      }
    }

    const startBlinking = () => {
      interval = setInterval(() => {
        blinkFavicon()
        document.title = isDefaultFavicon
          ? 'Partida Encontrada!'
          : 'ReloadClub: Beta'
      }, 1000)
    }

    const stopBlinking = () => {
      clearInterval(interval)
      const link = document.querySelector(
        "link[rel*='icon']"
      ) as HTMLLinkElement

      if (link) {
        link.href = defaultFavicon
        document.title = 'ReloadClub: Beta'
      }
    }

    if (openMatchFoundModal) {
      startBlinking()
      return stopBlinking
    } else {
      stopBlinking()
    }
  }, [openMatchFoundModal])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && openMatchFoundModal) {
        const showNotification = () => {
          if (notificationClicked && openMatchFoundModal) return

          const notification = new Notification(
            'Partida encontrada! Volte para a ReloadClub para aceitar.'
          )

          notification.onclick = () => {
            window.focus()
            notification.close()
            setNotificationClicked(true)
          }
        }

        if (Notification.permission === 'granted') {
          showNotification()
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              showNotification()
            }
          })
        }
      }
    }

    const addVisibilityChangeListener = () => {
      document.addEventListener('visibilitychange', handleVisibilityChange)
    }

    addVisibilityChangeListener()

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [openMatchFoundModal, notificationClicked])

  return (
    <>
      <Tooltip content={tooltipLabel}>
        <div className="flex-initial">
          <Button.Root
            queued={isInQueue}
            restricted={isRestricted}
            disabled={
              (!isOwner && !lobby?.queue) || !!preMatch || isInMatch || disabled
            }
            className={twMerge(
              'max-h-[73px] min-h-[73px] w-full gap-3 rounded-lg p-0',
              'group',
              '3xl:min-h-[53px] 3xl:p-1',
              'ultrawide:min-h-36 ultrawide:max-h-36',
              isInQueue && 'hover:bg-red-500'
            )}
            onClick={lobby?.queue_time ? handleCancelQueue : handleStart}
            disableClickSound={!lobby?.queue_time}
          >
            {!isRestricted && !isInQueue && (
              <Button.Content
                className={twMerge(
                  'text-[1.75rem] font-bold uppercase',
                  '3xl:text-2xl',
                  'ultrawide:text-6xl'
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
                    '3xl:text-xs 3xl:leading-none',
                    'ultrawide:text-3xl'
                  )}
                >
                  Grupo com restrição
                </span>

                <span
                  className={twMerge(
                    'flex w-full flex-1 items-center justify-center gap-1 text-lg font-bold uppercase',
                    'ultrawide:text-4xl'
                  )}
                >
                  <MdBlock
                    className={twMerge('text-white', 'ultrawide:text-3xl')}
                  />
                  <Timer initialTime={lobby.restriction_countdown} reverse />
                </span>
              </Button.Content>
            )}

            {!isRestricted && isInQueue && (
              <Button.Content
                className={twMerge(
                  'flex h-full w-full flex-col overflow-hidden text-[1.75rem] font-bold uppercase',
                  '3xl:text-2xl',
                  'ultrawide:text-6xl'
                )}
              >
                <span
                  className={twMerge(
                    'flex w-full flex-1 items-center justify-center transition-all',
                    'group-hover:-mt-[73px] group-hover:opacity-0',
                    '3xl:group-hover:-mt-[13px] 3xl:group-hover:max-h-[13px]',
                    'ultrawide:group-hover:-mt-36'
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
                    '3xl:max-h-[53px]',
                    'ultrawide:max-h-36'
                  )}
                >
                  <Button.Icon
                    icon={RiCloseFill}
                    className={twMerge('text-[1.75rem]', 'ultrawide:text-7xl')}
                  />
                  <span
                    className={twMerge(
                      'text-[1.375rem] font-bold uppercase',
                      'ultrawide:text-5xl'
                    )}
                  >
                    Cancelar
                  </span>
                </span>
              </Button.Content>
            )}
          </Button.Root>
        </div>
      </Tooltip>

      <ModalMatchFound
        open={openMatchFoundModal}
        setOpen={setOpenMatchFoundModal}
      />
    </>
  )
}
