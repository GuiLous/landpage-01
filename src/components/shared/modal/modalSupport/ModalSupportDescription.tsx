import { SUPPORT_LINK } from '@/constants'

import { Link } from '@/components/shared'

export function ModalSupportDescription() {
  return (
    <p className="max-w-[335px] text-center text-sm text-white 3xl:text-xs">
      Tem alguma dúvida? Preencha o formulário ou visite nossa{' '}
      <Link href={SUPPORT_LINK} target="_blank" inline>
        central de suporte.
      </Link>
    </p>
  )
}
