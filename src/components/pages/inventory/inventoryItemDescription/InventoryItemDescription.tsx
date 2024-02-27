import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { formatDateToPtFormat } from '@/utils'

import { StoreItem } from '@/functions'

import { Divider } from '@/components/shared'

interface InventoryItemDescriptionProps {
  item: StoreItem
  isArsenal?: boolean
  children: ReactNode
}

export function InventoryItemDescription({
  item,
  isArsenal = false,
  children,
}: InventoryItemDescriptionProps) {
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

      {!isArsenal && children}
    </div>
  )
}
