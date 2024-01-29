import { getAuthServer } from '@/utils'

export function VerifyHeader() {
  const auth = getAuthServer()

  return (
    <header className="flex-col items-start">
      <span className="text-center text-sm">
        Insira o código enviado para o email
      </span>
      <span className="text-sm leading-none text-cyan-400">{auth?.email}</span>
    </header>
  )
}
