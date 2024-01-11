import { twMerge } from 'tailwind-merge'

export function ModalReloadCoinConfirmationMessage() {
  return (
    <div
      className={twMerge(
        'flex-col items-center gap-6 max-w-[434px]',
        '3xl:gap-5 3xl:max-w-[355px]'
      )}
    >
      <p className={twMerge('text-center text-white', '3xl:text-sm')}>
        Sua compra foi finalizada com sucesso!
        <br />
        Você receberá um e-mail com todos os detalhes.
      </p>

      <p className={twMerge('text-center text-white', '3xl:text-sm')}>
        O item adquirido já está disponível em seu inventário. Deseja{' '}
        <span
          className={twMerge(
            'text-center text-white font-semibold',
            '3xl:text-sm'
          )}
        >
          ativá-lo
        </span>{' '}
        agora?
      </p>
    </div>
  )
}
