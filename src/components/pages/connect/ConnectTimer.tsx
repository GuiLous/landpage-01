'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

import { COUNTDOWN_TIME, TIMER_NAME } from '@/constants'

import { revalidatePath } from '@/utils'

import { useMatchStore } from '@/store/matchStore'

import { Timer } from '@/components/shared'

import { useAuth, usePersistentTimer } from '@/hooks'

const loadingGif = '/assets/images/loading.gif'

interface ConnectTimerProps {
  isLoading?: boolean
}

export function ConnectTimer({ isLoading = true }: ConnectTimerProps) {
  const { match } = useMatchStore()

  const auth = useAuth()

  const router = useRouter()

  const timeLeft = usePersistentTimer(COUNTDOWN_TIME, TIMER_NAME, isLoading)

  useEffect(() => {
    if (timeLeft === 0) {
      revalidatePath({ path: `/perfil/${auth?.id}/partidas/${match?.id}` })
      return router.push(`/perfil/${auth?.id}/partidas/${match?.id}`)
    }
  }, [timeLeft, match?.id, auth?.id, router])

  return (
    <div className={twMerge('justify-end gap-3.5', 'ultrawide:gap-7')}>
      <span
        className={twMerge(
          'text-2xl font-semibold text-white',
          '3xl:text-xl',
          'ultrawide:text-4xl'
        )}
      >
        <Timer initialTime={timeLeft || 1} reverse />
      </span>

      <div
        className={twMerge(
          'relative flex-initial w-12',
          '3xl:w-9',
          'ultrawide:w-16'
        )}
      >
        <Image src={loadingGif} alt="Loading gif" fill priority />
      </div>
    </div>
  )
}
