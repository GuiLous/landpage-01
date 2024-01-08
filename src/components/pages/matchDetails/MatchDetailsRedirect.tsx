'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'

import { revalidatePath } from '@/utils'

import { Player, useMatchStore } from '@/store/matchStore'

interface MatchDetailsRedirectProps {
  playerOnMatch?: Player
}

export function MatchDetailsRedirect({
  playerOnMatch,
}: MatchDetailsRedirectProps) {
  const match = useMatchStore.getState().match

  const router = useRouter()

  const verifyStatusToRedirect = useCallback(() => {
    if (playerOnMatch && match && match?.status === 'cancelled') {
      revalidatePath({ path: '/jogar' })
      return router.push('/jogar')
    }
  }, [match, router, playerOnMatch])

  useEffect(() => {
    verifyStatusToRedirect()
  }, [verifyStatusToRedirect])

  return null
}
