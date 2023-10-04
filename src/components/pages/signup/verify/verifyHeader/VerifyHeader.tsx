'use client'

import { BiSolidLock } from 'react-icons/bi'

import { useAppSelector } from '@/store'

export function VerifyHeader() {
  const { user } = useAppSelector((state) => state.user)

  return (
    <header className="flex-col items-center justify-center gap-7">
      <BiSolidLock size={48} />

      <div className="flex-initial flex-col items-center">
        <h2 className="text-xl font-bold uppercase">Verificação obrigatória</h2>

        <span className="text-center text-sm font-normal">
          Insira o código enviado para o email{' '}
          <span className="text-sm text-purple-300">{user?.email}</span>
        </span>
      </div>
    </header>
  )
}
