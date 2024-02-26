import { BiSolidTrashAlt } from 'react-icons/bi'

import { ProfileCard } from '@/components/shared'

import { AccountDeleteCardButton } from './AccountDeleteCardButton'

export function AccountDeleteCard() {
  return (
    <ProfileCard
      title="EXCLUIR CONTA"
      description="Exclua permanentemente a sua conta. Essa ação é permanente e não pode ser desfeita."
      icon={BiSolidTrashAlt}
      variant="account"
    >
      <div className="items-end">
        <AccountDeleteCardButton />
      </div>
    </ProfileCard>
  )
}
