import { BiSolidLock } from 'react-icons/bi'

import { ProfileCard } from '@/components/shared'

import { AccountChangeEmailCardForm } from './AccountChangeEmailCardForm'

export function AccountChangeEmailCard() {
  return (
    <ProfileCard
      title="INFORMAÇÕES PESSOAIS"
      description="Essa informação é particular e não será compartilhada com outras pessoas."
      icon={BiSolidLock}
      variant="account"
    >
      <AccountChangeEmailCardForm />
    </ProfileCard>
  )
}
