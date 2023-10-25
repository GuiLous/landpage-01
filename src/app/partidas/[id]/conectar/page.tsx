'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { CONNECT_TEXTS_ARRAY, COUNTDOWN_TIME, TIMER_NAME } from '@/constants'

import { storageService } from '@/services'

import { useAppSelector } from '@/store'

import {
  ConnectAvatarImage,
  ConnectIpMessage,
  ConnectLogo,
  ConnectTimer,
} from '@/components/pages'

import { Loading } from '@/components/shared'

import { usePersistentTimer } from '@/hooks'

export default function Connect() {
  const { match } = useAppSelector((state) => state.match)

  const { user } = useAppSelector((state) => state.user)

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)

  const timeLeft = usePersistentTimer(COUNTDOWN_TIME, TIMER_NAME, isLoading)

  const verifyMatchStatus = useCallback(() => {
    if (!match || match.status === 'cancelled') {
      storageService.remove('matchConnectTimer')
      router.push('/jogar')
    } else {
      switch (match.status) {
        case 'warmup':
          console.log('aqui')
          setIsLoading(false)
          break
        case 'running':
          storageService.remove('matchConnectTimer')
          router.push(`/perfil/${user?.id}/partidas/${match.id}`)
          break
        default:
          break
      }
    }
  }, [match, user?.id, router, setIsLoading])

  useEffect(() => {
    verifyMatchStatus()
  }, [match, verifyMatchStatus])

  useEffect(() => {
    if (timeLeft === 0) router.push(`/perfil/${user?.id}/partidas/${match?.id}`)
  }, [timeLeft, match?.id, user?.id, router])

  return isLoading ? (
    <Loading.Overlay>
      <Loading.Gif />
      <Loading.AnimatedMessages textsArray={CONNECT_TEXTS_ARRAY} />
    </Loading.Overlay>
  ) : (
    <main
      className={twMerge(
        'items-end bg-black h-screen px-[10%] relative',
        'bg-no-repeat bg-connect bg-cover bg-[position:right_bottom]',
        '3xl:px-[8%]'
      )}
    >
      <ConnectAvatarImage />

      <section
        className={twMerge(
          'flex-col items-end justify-center mb-28',
          '3xl:mb-[90px]'
        )}
      >
        <div
          className={twMerge(
            'flex-col items-end justify-center gap-20',
            '3xl:gap-14'
          )}
        >
          <ConnectLogo />

          <ConnectIpMessage />

          <ConnectTimer timeLeft={timeLeft} />
        </div>
      </section>
    </main>
  )
}
