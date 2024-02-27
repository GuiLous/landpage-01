import { twMerge } from 'tailwind-merge'

import { ConnectIp } from './ConnectIp'

export function ConnectIpMessage() {
  return (
    <div className={twMerge('flex-col items-end gap-[1.125rem]', '3xl:gap-4')}>
      <p
        className={twMerge(
          'text-xl font-bold uppercase text-white',
          '3xl:text-lg',
          'ultrawide:text-4xl'
        )}
      >
        É hora do jogo!
      </p>

      <p
        className={twMerge(
          'font-medium text-end max-w-[455px] text-white',
          '3xl:text-sm',
          'ultrawide:text-3xl ultrawide:max-w-[895px]'
        )}
      >
        Para jogar, abra o FiveM e clique no botão abaixo. Ou se preferir,
        insira o IP abaixo na lista de servidores.{' '}
        <span className="block font-medium text-cyan-400">
          Você tem até 5 minutos para se conectar.
        </span>
      </p>

      <ConnectIp />
    </div>
  )
}
