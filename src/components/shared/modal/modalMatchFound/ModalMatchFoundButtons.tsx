'use client'

import { MouseEvent, useCallback, useEffect, useState } from 'react'

import { MATCH_FOUND_GAP_TIMEOUT, TIME_OUT_MULTIPLIER } from '@/constants'

import { usePreMatchStore } from '@/store/preMatchStore'

import { preMatchApi } from '@/modelsApi'

import { Button, Timer } from '@/components/shared'

import { useAuth, useShowErrorToast } from '@/hooks'

interface ModalMatchFoundButtonsProps {
  open: boolean
}

export function ModalMatchFoundButtons({ open }: ModalMatchFoundButtonsProps) {
  const preMatch = usePreMatchStore.getState().preMatch

  const showErrorToast = useShowErrorToast()

  const auth = useAuth()

  const [timeExpired, setTimeExpired] = useState(false)

  const handleAccept = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if (timeExpired || !auth?.token) return

      let response = null

      response = await preMatchApi.playerReady(auth.token)

      if (response.errorMsg) {
        showErrorToast(response.errorMsg)
      }
    },
    [timeExpired, showErrorToast, auth?.token]
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
  )
}
