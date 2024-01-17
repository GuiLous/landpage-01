'use client'

import { MouseEvent, useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import { twMerge } from 'tailwind-merge'

import { Button, ModalReloadCoins, Tooltip } from '@/components/shared'

export default function SidebarRCButton() {
  const [openModalReloadCoin, setOpenModalReloadCoin] = useState(false)

  const handleOpenModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setOpenModalReloadCoin(true)
  }

  return (
    <>
      <Tooltip content="Comprar Reload Coins">
        <span>
          <Button.Root
            onClick={handleOpenModal}
            className={twMerge(
              'max-h-9 min-h-9 min-w-9 rounded-e-none',
              '3xl:max-h-8 3xl:min-h-8 3xl:min-w-8'
            )}
          >
            <Button.Icon icon={BiPlus} size={24} />
          </Button.Root>
        </span>
      </Tooltip>

      <ModalReloadCoins
        open={openModalReloadCoin}
        setOpen={setOpenModalReloadCoin}
      />
    </>
  )
}
