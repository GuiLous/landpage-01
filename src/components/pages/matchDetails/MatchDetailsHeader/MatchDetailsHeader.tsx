import { ReactNode } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'

import { GoBackLink } from '@/components/shared'

interface MatchDetailsHeaderProps {
  children: ReactNode
  user_id: number
}

export function MatchDetailsHeader({
  children,
  user_id,
}: MatchDetailsHeaderProps) {
  return (
    <header className="flex-initial items-center justify-between">
      <GoBackLink.Root
        href={`/perfil/${user_id}`}
        className="relative left-0 top-0"
      >
        <GoBackLink.Icon icon={IoIosArrowRoundBack} size={31} />
        <GoBackLink.Content className="text-sm">Voltar</GoBackLink.Content>
      </GoBackLink.Root>

      {children}
    </header>
  )
}
