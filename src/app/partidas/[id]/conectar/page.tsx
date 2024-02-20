import { redirect } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

import { CONNECT_TEXTS_ARRAY } from '@/constants'

import { getAuthServer, revalidatePath } from '@/utils'

import { storageService } from '@/services'

import { useMatchStore } from '@/store/matchStore'

import {
  ConnectAvatarImage,
  ConnectIpMessage,
  ConnectLogo,
  ConnectTimer,
} from '@/components/pages'

import { Loading } from '@/components/shared'

export default function Connect() {
  const match = useMatchStore.getState().match
  const auth = getAuthServer()

  let isLoading = true

  if (!match || match.status === 'cancelled') {
    storageService.remove('matchConnectTimer')
    return redirect('/jogar')
  } else {
    switch (match.status) {
      case 'warmup':
        isLoading = false
        break
      case 'running':
        storageService.remove('matchConnectTimer')
        revalidatePath({ path: `/perfil/${auth?.id}/partidas/${match.id}` })
        return redirect(`/perfil/${auth?.id}/partidas/${match.id}`)
      default:
        break
    }
  }

  return isLoading ? (
    <Loading.Overlay>
      <Loading.Gif />
      <Loading.AnimatedMessages textsArray={CONNECT_TEXTS_ARRAY} />
    </Loading.Overlay>
  ) : (
    <main
      className={twMerge(
        'items-end bg-black h-screen  relative',
        'bg-no-repeat bg-connect bg-cover'
      )}
    >
      <ConnectAvatarImage />

      <section
        className={twMerge(
          'flex-col bottom-[90px] right-40 absolute items-end justify-center',
          '3xl:bottom-14 3xl:right-28',
          'ultrawide:bottom-40'
        )}
      >
        <div
          className={twMerge(
            'flex-col items-end justify-center gap-20',
            '3xl:gap-10'
          )}
        >
          <ConnectLogo />

          <ConnectIpMessage />

          <ConnectTimer isLoading={isLoading} />
        </div>
      </section>
    </main>
  )
}
