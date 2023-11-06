'use client'

import { useState } from 'react'
import { MdBlock } from 'react-icons/md'

import { Button, ModalInactiveAccount, ProfileCard } from '@/components/shared'

export function AccountInactiveCard() {
  const [openModalInactive, setOpenModalInactive] = useState(false)

  return (
    <ProfileCard
      title="INATIVAR CONTA"
      description="Ao inativar sua conta suas informações tornam-se privadas e você não será capaz de acessar nossos serviços até que a reative novamente."
      icon={MdBlock}
      variant="account"
    >
      <div>
        <Button.Root
          onClick={() => setOpenModalInactive(true)}
          className="max-h-[38px] w-full max-w-fit px-4"
        >
          <Button.Content
            className="text-sm font-semibold"
            loadingText="Deletando"
          >
            Prosseguir com a inativação
          </Button.Content>
        </Button.Root>
      </div>

      <ModalInactiveAccount
        open={openModalInactive}
        setOpen={setOpenModalInactive}
      />
    </ProfileCard>
  )
}
