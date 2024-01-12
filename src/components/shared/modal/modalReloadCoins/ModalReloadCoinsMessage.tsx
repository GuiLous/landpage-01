import { twMerge } from 'tailwind-merge'

export function ModalReloadCoinsMessage() {
  return (
    <p className={twMerge('text-white items-center text-sm', '3xl:text-xs')}>
      Reload Coins podem ser usados para comprar roupas, armas, decorativos e
      personagens.
    </p>
  )
}
