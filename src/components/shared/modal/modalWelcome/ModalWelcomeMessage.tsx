import { twMerge } from 'tailwind-merge'

import { useUserStore } from '@/store/userStore'

export function ModalWelcomeMessage() {
  const user = useUserStore.getState().user

  return (
    <p className=" text-center text-sm text-white">
      Você agora faz parte de um grupo{' '}
      <span
        className={twMerge('text-sm font-semibold text-white', 'leading-none')}
      >
        exclusivo
      </span>{' '}
      de jogadores da nossa comunidade. Por ser um dos primeiros, vamos te dar{' '}
      <span
        className={twMerge('text-sm font-semibold text-white', 'leading-none')}
      >
        {String(user?.invites_available_count).padStart(2, '0')} convites
      </span>{' '}
      pra chamar a sua tropa e jogar com seus amigos.
    </p>
  )
}
