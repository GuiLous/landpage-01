'use client'

import { formatDateToPtFormat, removeSFromEnd } from '@/utils'

import { StoreItem } from '@/functions'

import { Button } from '@/components/shared'

import { SubTabTypes } from './InventoryWrapperContent'

interface InventoryItemDescriptionProps {
  item: StoreItem
  itemType: SubTabTypes
  handleUpdateItemInUse: (itemId: number) => void
}
export function InventoryItemDescription({
  handleUpdateItemInUse,
  item,
  itemType,
}: InventoryItemDescriptionProps) {
  return (
    <div className="flex-initial flex-col gap-6">
      <span className="font-semibold uppercase text-white">{item.name}</span>

      <div className="flex-col gap-3">
        <p className="text-sm leading-none text-white">{item.description}</p>

        <span className="text-sm leading-none text-white">
          No jogo desde -{' '}
          <span className="font-semibold leading-none">
            {formatDateToPtFormat(item.release_date)}
          </span>
        </span>
      </div>

      <Button.Root
        restricted={item.in_use}
        className="max-h-[42px] w-full py-3"
        onClick={() => handleUpdateItemInUse(item.id)}
      >
        <Button.Content className="text-sm font-semibold">
          {item.in_use ? 'Remover' : 'Ativar'} {removeSFromEnd(itemType)}
        </Button.Content>
      </Button.Root>
    </div>
  )
}
