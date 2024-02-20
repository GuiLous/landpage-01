'use client'

import { removeSFromEnd } from '@/utils'

import { StoreItem } from '@/functions'

import { Button } from '@/components/shared'

import { SubTabTypes } from '../InventoryWrapperContent'

interface InventoryItemDescriptionButtonsProps {
  item: StoreItem
  itemType: SubTabTypes
  handleUpdateItemInUse: ({
    item_id,
    updateSelected,
  }: {
    item_id: number
    updateSelected?: boolean
  }) => void
  itemInUse: StoreItem | undefined
}

export function InventoryItemDescriptionButtons({
  handleUpdateItemInUse,
  item,
  itemType,
  itemInUse,
}: InventoryItemDescriptionButtonsProps) {
  const hasItemInUse = !!itemInUse

  return (
    <>
      {item?.id === 0 && hasItemInUse && (
        <Button.Root
          restricted
          className="max-h-[42px] w-full py-3"
          onClick={() =>
            handleUpdateItemInUse({
              item_id: itemInUse.id,
              updateSelected: false,
            })
          }
          disableClickSound
        >
          <Button.Content className="text-sm font-semibold">
            Remover {removeSFromEnd(itemType)}
          </Button.Content>
        </Button.Root>
      )}

      {item?.id !== 0 && (
        <Button.Root
          restricted={item.in_use}
          className="max-h-[42px] w-full py-3"
          onClick={() => handleUpdateItemInUse({ item_id: item.id })}
          disableClickSound
        >
          <Button.Content className="text-sm font-semibold">
            {item.in_use ? 'Remover' : 'Ativar'} {removeSFromEnd(itemType)}
          </Button.Content>
        </Button.Root>
      )}
    </>
  )
}
