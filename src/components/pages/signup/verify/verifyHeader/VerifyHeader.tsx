'use client'

import { useEffect, useState } from 'react'
import { BiSolidLock } from 'react-icons/bi'

import { useAuth } from '@/hooks'

import { userAuthToken } from '@/middleware'

export function VerifyHeader() {
  const [auth, setAuth] = useState<userAuthToken | null>(null)

  const getAuth = useAuth()

  useEffect(() => {
    const auth = getAuth()

    setAuth(auth)
  }, [getAuth])

  return (
    <header className="flex-col items-center justify-center gap-7">
      <BiSolidLock size={48} />

      <div className="flex-initial flex-col items-center">
        <h2 className="text-xl font-bold uppercase">Verificação obrigatória</h2>

        <span className="text-center text-sm font-normal">
          Insira o código enviado para o email{' '}
          <span className="text-sm text-purple-300">{auth?.email}</span>
        </span>
      </div>
    </header>
  )
}
