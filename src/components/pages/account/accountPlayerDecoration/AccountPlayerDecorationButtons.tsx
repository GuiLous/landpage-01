'use client'

import Link from 'next/link'
import { useCallback, useState } from 'react'

import { revalidate } from '@/utils'

import { StoreItem } from '@/functions'

import { storeApi } from '@/modelsApi'

import { Button } from '@/components/shared'

import { useAuth, useShowErrorToast } from '@/hooks'

interface AccountPlayerDecorationButtonsProps {
  isProfileCover: boolean
  in_use?: boolean
  itemSelected: StoreItem | null
  setNewItemSelected?: (state: StoreItem | null) => void
}

export function AccountPlayerDecorationButtons({
  isProfileCover,
  itemSelected,
  setNewItemSelected,
}: AccountPlayerDecorationButtonsProps) {
  const auth = useAuth()

  const showErrorToast = useShowErrorToast()

  const [isUpdatingInUse, setIsUpdatingInUse] = useState(false)

  const disableButton = itemSelected?.in_use || isUpdatingInUse

  const handleUpdateItemInUse = useCallback(async () => {
    if (!auth?.token || !setNewItemSelected) return

    if (itemSelected) {
      setIsUpdatingInUse(true)

      const payload = { in_use: !itemSelected.in_use }

      const response = await storeApi.updateInUse(
        auth.token,
        itemSelected.id,
        payload
      )

      if (response.errorMsg) {
        showErrorToast(response.errorMsg)
        setIsUpdatingInUse(false)
        return
      }

      const newItemSelected = response.items.find(
        (item: StoreItem) => item.id === itemSelected.id
      )
      setNewItemSelected(newItemSelected)

      setIsUpdatingInUse(false)
      revalidate('inventory')
    }
  }, [auth?.token, itemSelected, setNewItemSelected, showErrorToast])

  return (
    <div className="flex-initial items-center justify-end gap-4">
      <Button.Root className="max-h-[38px] min-h-[38px] px-3" neutral asChild>
        <Link href="/loja">
          <Button.Content className="text-sm font-semibold text-gray-300">
            Mais {isProfileCover ? 'capas' : 'cards'}
          </Button.Content>
        </Link>
      </Button.Root>

      <Button.Root
        className="max-h-[38px] min-h-[38px] px-3"
        disabled={disableButton}
        onClick={handleUpdateItemInUse}
      >
        <Button.Content
          className="text-sm font-semibold"
          disabled={disableButton}
        >
          Aplicar
        </Button.Content>
      </Button.Root>
    </div>
  )
}
