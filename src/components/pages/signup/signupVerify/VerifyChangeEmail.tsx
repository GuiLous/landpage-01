import { twMerge } from 'tailwind-merge'

import { Link } from '@/components/shared'

export function VerifyChangeEmail() {
  return (
    <footer className="max-w-fit flex-initial">
      <p
        className={twMerge(
          'text-center text-sm text-gray-300',
          'ultrawide:text-2xl'
        )}
      >
        Não é seu e-mail?{' '}
        <Link href="/alterar-email" inline>
          Clique aqui
        </Link>
        .
      </p>
    </footer>
  )
}
