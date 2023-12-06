'use client'

import { useAppSelector } from '@/store'

export function ModalSendInvitesInitialMessage() {
  const { user } = useAppSelector((state) => state.user)

  return (
    <div className="max-w-fit flex-initial flex-col items-center justify-center gap-9">
      <p className="text-center text-sm text-white">
        Você ainda tem{' '}
        <span className="text-sm font-semibold leading-none text-white">
          {String(user?.invites_available_count).padStart(2, '0')} convites
        </span>{' '}
        . Chama sua tropa e jogue agora!
      </p>

      <p className="max-w-[542px] text-center text-sm text-white">
        A pessoa receberá um convite no e-mail cadastrado abaixo.
        <br />
        Mas fica de olho, os convites{' '}
        <span className="font-semibold leading-none text-white">
          são intransferíveis
        </span>{' '}
        e apenas esse e-mail servirá de acesso na plataforma, caso contrário,
        não poderá ser acessado.
        <br />
        Depois disso, só partir pra jogo e gg!
      </p>
    </div>
  )
}
