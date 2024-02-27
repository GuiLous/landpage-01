'use client'

import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button, ModalDeleteAccount } from '@/components/shared'

export function AccountDeleteCardButton() {
  const [openModalDelete, setOpenModalDelete] = useState(false)

  return (
    <>
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

      <ModalDeleteAccount open={openModalDelete} setOpen={setOpenModalDelete} />
    </>
  )
}
