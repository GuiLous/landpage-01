import { Link } from '@/components/shared'

export function VerifyChangeEmail() {
  return (
    <footer className="max-w-fit flex-initial">
      <p className="text-center text-sm text-gray-300">
        Não é seu e-mail?{' '}
        <Link href="/alterar-email" inline>
          Clique aqui
        </Link>
        .
      </p>
    </footer>
  )
}
