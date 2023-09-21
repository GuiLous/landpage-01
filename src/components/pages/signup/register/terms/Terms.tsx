import { privacyPolicyLink, useTermsLink } from '@/utils'

import { Link } from '@/components/shared'

export function Terms() {
  return (
    <p className="text-sm text-gray-300">
      Ao se cadastrar, você concorda com os{' '}
      <Link href={useTermsLink} inline>
        Termos de Uso
      </Link>{' '}
      e a{' '}
      <Link href={privacyPolicyLink} inline>
        Política de Privacidade
      </Link>
    </p>
  )
}
