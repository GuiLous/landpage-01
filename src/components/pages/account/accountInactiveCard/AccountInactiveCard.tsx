import { MdBlock } from 'react-icons/md'

import { ProfileCard } from '@/components/shared'

import { AccountInactiveCardButton } from './AccountInactiveCardButton'

export function AccountInactiveCard() {
  return (
    <ProfileCard
      title="INATIVAR CONTA"
      description="Ao inativar sua conta suas informações tornam-se privadas e você não será capaz de acessar nossos serviços até que a reative novamente."
      icon={MdBlock}
      variant="account"
    >
      <div className="items-end">
        <AccountInactiveCardButton />
      </div>
    </ProfileCard>
  )
}
