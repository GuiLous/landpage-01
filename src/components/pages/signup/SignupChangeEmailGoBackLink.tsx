import { twMerge } from 'tailwind-merge'

import { Link } from '@/components/shared'

export function SignupChangeEmailGoBackLink() {
  return (
    <div className="items-end justify-center">
      <Link href="/verificar" className={twMerge('ultrawide:text-2xl')}>
        Cancelar e voltar
      </Link>
    </div>
  )
}
