'use client'

import { MouseEvent, useCallback, useEffect, useState } from 'react'

import { MATCH_FOUND_GAP_TIMEOUT, TIME_OUT_MULTIPLIER } from '@/constants'

import { storageService } from '@/services'

import { useAppSelector } from '@/store'

import { preMatchApi } from '@/api'

import { Button, Modal, Timer } from '@/components/shared'

import { useShowErrorToast } from '@/hooks'

import { ModalMatchFoundPlayersIcon } from './ModalMatchFoundPlayersIcon'

interface ModalLogoutProps {
  open: boolean
  setOpen: (state: boolean) => void
}

export function ModalMatchFound({ open, setOpen }: ModalLogoutProps) {
  const { preMatch } = useAppSelector((state) => state.preMatch)

  const showErrorToast = useShowErrorToast()

  const [timeExpired, setTimeExpired] = useState(false)

  const handleAccept = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      const userToken = storageService.get('token')

      if (timeExpired || !userToken) return

      let response = null

      response = await preMatchApi.playerReady(userToken)

      if (response.errorMsg) {
        showErrorToast(response.errorMsg)
      }
    },
    [timeExpired, showErrorToast]
  )

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (preMatch?.countdown) {
      timeoutId = setTimeout(
        () => {
          setTimeExpired(true)
        },
        preMatch.countdown * TIME_OUT_MULTIPLIER + MATCH_FOUND_GAP_TIMEOUT
      )
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [preMatch?.countdown])

  useEffect(() => {
    if (!open) {
      setTimeExpired(false)
    }
  }, [open])

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Content
        showCloseButton={false}
        title="PARTIDA ENCONTRADA"
        className="min-w-[650px] max-w-[650px]"
      >
        <div className="mt-3 flex-col items-center justify-center gap-10">
          <h3 className="text-center text-sm text-cyan-400">Ranqueada · 5x5</h3>

          <ModalMatchFoundPlayersIcon />

          <div className="flex-col items-center justify-center">
            <Button.Root
              className="w-full max-w-fit px-3"
              disabled={(preMatch && preMatch.user_ready) || timeExpired}
              onClick={handleAccept}
            >
              <Button.Content className="text-sm font-semibold">
                {preMatch && preMatch.user_ready
                  ? 'Você está pronto!'
                  : 'Aceitar partida'}
              </Button.Content>
            </Button.Root>

            <div className="mt-3.5 justify-center text-white">
              {preMatch && preMatch.countdown && preMatch.countdown <= 0
                ? '00:00'
                : preMatch &&
                  preMatch.countdown && (
                    <Timer
                      reverse
                      formatted={true}
                      initialTime={preMatch.countdown}
                    />
                  )}
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  )
}
