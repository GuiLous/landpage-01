'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'

import { Player, useMatchStore } from '@/store/matchStore'

interface MatchDetailsRedirectProps {
  playerOnMatch?: Player
}

export function MatchDetailsRedirect({
  playerOnMatch,
}: MatchDetailsRedirectProps) {
  const { match } = useMatchStore()

  const router = useRouter()

  const verifyStatusToRedirect = useCallback(() => {
    if (playerOnMatch && match && match?.status === 'cancelled') {
      return router.push('/jogar')
    }
  }, [match, router, playerOnMatch])

  useEffect(() => {
    verifyStatusToRedirect()
  }, [verifyStatusToRedirect])

  return null
}
