import { twMerge } from 'tailwind-merge'

import { PRIVACY_POLICY_LINK, USETERMS_LINK } from '@/constants'

import { Link } from '@/components/shared'

export function SignupRegisterTerms() {
  return (
    <p
      className={twMerge(
        '-mt-1 text-xs leading-5 text-gray-300',
        'ultrawide:text-2xl'
      )}
    >
      Ao se cadastrar, você concorda com os <br />
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
