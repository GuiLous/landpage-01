'use client'

import { useState } from 'react'
import { BiPlus } from 'react-icons/bi'

import { Button, Tooltip } from '@/components/shared'

export default function SidebarRCButton() {
  const [openModalReloadCoin, setOpenModalReloadCoin] = useState(false)

  return (
    <Tooltip content="Comprar Reload Coins">
      <span>
        <Button.Root
          onClick={() => setOpenModalReloadCoin(true)}
          className="max-h-9 min-h-9 min-w-9 rounded-e-none"
        >
          <Button.Icon icon={BiPlus} size={24} />
        </Button.Root>
      </span>
    </Tooltip>
  )
}
