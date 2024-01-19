import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

import { StoreItem } from '@/functions'

import { Button } from '@/components/shared'

interface InventoryActiveWeaponButtonProps {
  weapon_id?: number
  in_use?: boolean
  hasItemInUse?: boolean
  itemInUse?: StoreItem
  handleUpdateItemInUse: ({
    item_id,
    updateSelected,
  }: {
    item_id: number
    updateSelected?: boolean
  }) => void
}

export function InventoryActiveWeaponButton({
  weapon_id,
  handleUpdateItemInUse,
  in_use = false,
  hasItemInUse = false,
  itemInUse,
}: InventoryActiveWeaponButtonProps) {
  const isNullItemSelected = weapon_id === 0 && hasItemInUse

  const updateItem = useCallback(() => {
    if (weapon_id === 0 && itemInUse?.id)
      return handleUpdateItemInUse({
        item_id: itemInUse.id,
        updateSelected: false,
      })

    if (weapon_id) {
      handleUpdateItemInUse({ item_id: weapon_id })
    }
  }, [handleUpdateItemInUse, itemInUse?.id, weapon_id])

  return (
    <Button.Root
      className={twMerge(
        'max-h-[42px] min-h-[42px] w-[204px]',
        '3xl:max-h-[38px] 3xl:min-h-[38px] 3xl:w-[184px]"'
      )}
      onClick={updateItem}
      restricted={in_use || isNullItemSelected}
    >
      <Button.Content className="text-sm font-semibold">
        {in_use || isNullItemSelected ? 'Remover skin' : 'Equipar skin'}
      </Button.Content>
    </Button.Root>
  )
}
