'use client'

import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button, ModalInactiveAccount } from '@/components/shared'

export function AccountInactiveCardButton() {
  const [openModalInactive, setOpenModalInactive] = useState(false)

  return (
    <>
      <Button.Root
        onClick={() => setOpenModalInactive(true)}
        className={twMerge(
          'max-h-[38px] w-full max-w-fit px-4',
          'ultrawide:max-h-20 ultrawide:min-h-20'
        )}
      >
        <Button.Content
          className="text-sm font-semibold"
          loadingText="Deletando"
        >
          Prosseguir com a inativação
        </Button.Content>
      </Button.Root>

      <ModalInactiveAccount
        open={openModalInactive}
        setOpen={setOpenModalInactive}
      />
    </>
  )
}
