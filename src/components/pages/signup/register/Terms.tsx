import { PRIVACY_POLICY_LINK, USETERMS_LINK } from '@/constants'

import { Link } from '@/components/shared'

export function Terms() {
  return (
    <p className="text-sm text-gray-300">
      Ao se cadastrar, você concorda com os{' '}
      <Link target="_blank" href={USETERMS_LINK} inline>
        Termos de Uso
      </Link>{' '}
      e a{' '}
      <Link target="_blank" href={PRIVACY_POLICY_LINK} inline>
        Política de Privacidade
      </Link>
    </p>
  )
}
