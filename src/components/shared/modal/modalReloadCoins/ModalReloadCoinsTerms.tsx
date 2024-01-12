import { twMerge } from 'tailwind-merge'

import { Link } from '@/components/shared'

export function ModalReloadCoinsTerms() {
  return (
    <p className={twMerge('text-center text-sm text-white', '3xl:text-xs')}>
      Ao selecionar um pacote Reload Coins, você concorda com os{' '}
      <Link
        href="https://reloadclub.freshdesk.com/support/solutions/articles/150000108190-termos-de-uso"
        target="_blank"
        inline
      >
        Termos de Uso
      </Link>{' '}
      e as{' '}
      <Link
        href="https://reloadclub.freshdesk.com/support/solutions/articles/150000108164-pol%C3%ADtica-de-privacidade"
        target="_blank"
        inline
      >
        Políticas de Privacidade
      </Link>
      .
    </p>
  )
}
