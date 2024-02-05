import { twMerge } from 'tailwind-merge'

import { SUPPORT_LINK } from '@/constants'

import { Link } from '@/components/shared'

export function ModalSupportDescription() {
  return (
    <p
      className={twMerge(
        'max-w-[335px] text-center text-sm text-white',
        '3xl:text-xs',
        'ultrawide:text-xl ultrawide:max-w-[450px]'
      )}
    >
      Tem alguma dúvida? Preencha o formulário ou visite nossa{' '}
      <Link href={SUPPORT_LINK} target="_blank" inline>
        central de suporte.
      </Link>
    </p>
  )
}
