'use client'

import { useState } from 'react'
import { BiSolidTrashAlt } from 'react-icons/bi'
import { twMerge } from 'tailwind-merge'

import { Button, ModalDeleteAccount, ProfileCard } from '@/components/shared'

export function AccountDeleteCard() {
  const [openModalDelete, setOpenModalDelete] = useState(false)

  return (
    <ProfileCard
      title="EXCLUIR CONTA"
      description="Exclua permanentemente a sua conta. Essa ação é permanente e não pode ser desfeita."
      icon={BiSolidTrashAlt}
      variant="account"
    >
      <div className="items-end">
        <Button.Root
          onClick={() => setOpenModalDelete(true)}
          className={twMerge(
            'max-h-[38px] w-full max-w-fit px-4',
            'ultrawide:max-h-20 ultrawide:min-h-20'
          )}
        >
          <Button.Content
            className="text-sm font-semibold"
            loadingText="Deletando"
          >
            Prosseguir com a exclusão
          </Button.Content>
        </Button.Root>
      </div>

      <ModalDeleteAccount open={openModalDelete} setOpen={setOpenModalDelete} />
    </ProfileCard>
  )
}
