import { ReactNode } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'

import { getAuthServer } from '@/utils'

import { GoBackLink } from '@/components/shared'

interface MatchDetailsHeaderProps {
  children: ReactNode
}

export function MatchDetailsHeader({ children }: MatchDetailsHeaderProps) {
  const auth = getAuthServer()

  return (
    <header className="flex-initial items-center justify-between">
      <GoBackLink.Root
        href={`/perfil/${auth.id}`}
        className="relative left-0 top-0"
      >
        <GoBackLink.Icon icon={IoIosArrowRoundBack} size={31} />
        <GoBackLink.Content className="text-sm">Voltar</GoBackLink.Content>
      </GoBackLink.Root>

      {children}
    </header>
  )
}
