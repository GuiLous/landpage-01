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
  isArsenal?: boolean
}

export function InventoryItemDescription({
  handleUpdateItemInUse,
  item,
  itemType,
  itemInUse,
  isArsenal = false,
}: InventoryItemDescriptionProps) {
  const hasItemInUse = !!itemInUse
  const showSideInfo = item.item_type === 'wear'

  return (
    <div className="flex-initial flex-col gap-6">
      {item?.id !== 0 && (
        <>
          <div className="items-center gap-2">
            {showSideInfo && (
              <>
                <span
                  className={twMerge(
                    'leading-none text-red-500 font-medium',
                    item.subtype === 'def' && 'text-blue-500',
                    'ultrawide:text-2xl'
                  )}
                >
                  {item.subtype === 'def' ? 'DEF' : 'ATA'}
                </span>

                <Divider className="mb-px h-[11px] w-px max-w-[1px] bg-gray-300" />
              </>
            )}

            <span
              className={twMerge(
                'font-semibold uppercase text-white',
                'ultrawide:text-2xl'
              )}
            >
              {item.name}
            </span>
          </div>

          <div className="flex-col gap-3.5">
            <p
              className={twMerge(
                'text-sm text-white leading-tight',
                'ultrawide:text-xl ultrawide:leading-tight'
              )}
            >
              {item.description}
            </p>

            <span
              className={twMerge(
                'text-sm text-white',
                'leading-none',
                'ultrawide:text-xl ultrawide:leading-none'
              )}
            >
              No jogo desde -{' '}
              <span className="font-semibold leading-none">
                {formatDateToPtFormat(item.release_date)}
              </span>
            </span>
          </div>
        </>
      )}

      {!isArsenal && (
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
      )}
    </div>
  )
}
