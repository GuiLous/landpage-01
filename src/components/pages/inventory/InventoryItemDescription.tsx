'use client'

import { twMerge } from 'tailwind-merge'

import { formatDateToPtFormat, removeSFromEnd } from '@/utils'

import { StoreItem } from '@/functions'

import { Button, Divider } from '@/components/shared'

import { SubTabTypes } from './InventoryWrapperContent'

interface InventoryItemDescriptionProps {
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

export function InventoryItemDescription({
  handleUpdateItemInUse,
  item,
  itemType,
  itemInUse,
}: InventoryItemDescriptionProps) {
  const hasItemInUse = !!itemInUse

  const isProfileItem =
    itemType === 'capas de perfil' || itemType === 'cards de jogador'

  return (
    <div className="flex-initial flex-col gap-6">
      {item?.id !== 0 && (
        <>
          <div className="items-center gap-2">
            {item?.subtype && !isProfileItem && (
              <>
                <span
                  className={twMerge(
                    'leading-none text-red-500 font-medium',
                    item.subtype === 'def' && 'text-blue-500'
                  )}
                >
                  {item.subtype === 'def' ? 'DEF' : 'ATA'}
                </span>

                <Divider className="mb-px h-[11px] w-px max-w-[1px] bg-gray-300" />
              </>
            )}

            <span className="font-semibold uppercase text-white">
              {item.name}
            </span>
          </div>

          <div className="flex-col gap-3">
            <p className="text-sm leading-none text-white">
              {item.description}
            </p>

            {!isProfileItem && (
              <span className="text-sm leading-none text-white">
                No jogo desde -{' '}
                <span className="font-semibold leading-none">
                  {formatDateToPtFormat(item.release_date)}
                </span>
              </span>
            )}
          </div>
        </>
      )}

      {item?.id === 0 && hasItemInUse && (
        <Button.Root
          restricted
          className="max-h-[42px] w-full py-3"
          onClick={() =>
            handleUpdateItemInUse({
              item_id: item?.id === 0 ? itemInUse.id : item.id,
              updateSelected: item?.id !== 0,
            })
          }
        >
          <Button.Content className="text-sm font-semibold">
            Remover {isProfileItem ? 'Customizável' : removeSFromEnd(itemType)}
          </Button.Content>
        </Button.Root>
      )}

      {item?.id !== 0 && (
        <Button.Root
          restricted={item.in_use}
          className="max-h-[42px] w-full py-3"
          onClick={() => handleUpdateItemInUse({ item_id: item.id })}
        >
          <Button.Content className="text-sm font-semibold">
            {item.in_use ? 'Remover' : 'Ativar'}{' '}
            {isProfileItem ? 'Customizável' : removeSFromEnd(itemType)}
          </Button.Content>
        </Button.Root>
      )}
    </div>
  )
}
