import { twMerge } from 'tailwind-merge'

import { getAuthServer } from '@/utils'

export async function VerifyHeader() {
  const auth = await getAuthServer()

  return (
    <header className="flex-col items-start">
      <span className={twMerge('text-center text-sm', 'ultrawide:text-3xl')}>
        Insira o código enviado para o email
      </span>
      <span
        className={twMerge(
          'text-sm leading-none text-cyan-400',
          'ultrawide:text-3xl ultrawide:leading-none'
        )}
      >
        {auth?.email}
      </span>
    </header>
  )
}
