import { ReactNode } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { twMerge } from 'tailwind-merge'

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
        <GoBackLink.Icon
          icon={IoIosArrowRoundBack}
          className={twMerge('text-3xl', 'ultrawide:text-5xl')}
        />
        <GoBackLink.Content className={twMerge('text-sm', 'ultrawide:text-xl')}>
          Voltar
        </GoBackLink.Content>
      </GoBackLink.Root>

      {children}
    </header>
  )
}
