import { twMerge } from 'tailwind-merge'

export function ModalReloadCoinConfirmationMessage() {
  return (
    <div className={twMerge('flex-col items-center gap-6', '3xl:gap-5')}>
      <p
        className={twMerge(
          'text-center text-white',
          '3xl:text-sm',
          'ultrawide:text-xl'
        )}
      >
        Sua compra foi finalizada com sucesso!
        <br />
        Você receberá um <span className="font-semibold">e-mail</span> de
        confirmação de compra.
      </p>

      <p
        className={twMerge(
          'text-center text-white',
          '3xl:text-sm',
          'ultrawide:text-xl'
        )}
      >
        O item adquirido já está disponível em sua conta.
      </p>
    </div>
  )
}
