import { useUserStore } from '@/store/userStore'

export function ModalWelcomeMessage() {
  const user = useUserStore.getState().user

  return (
    <p className=" text-center text-sm text-white">
      Você agora faz parte de um grupo{' '}
      <span className="text-sm font-semibold leading-none text-white">
        exclusivo
      </span>{' '}
      de jogadores da nossa comunidade. Por ser um dos primeiros, vamos te dar{' '}
      <span className="text-sm font-semibold leading-none text-white">
        {String(user?.invites_available_count).padStart(2, '0')} convites
      </span>{' '}
      pra chamar a sua tropa e jogar com seus amigos.
    </p>
  )
}
