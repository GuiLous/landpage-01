import { twMerge } from 'tailwind-merge'

import { getItemName } from '@/utils'

import { StoreItem } from '@/functions'

import { Divider } from '@/components/shared'

interface StoreItemCardInfoNameProps {
  item: StoreItem
}

export function StoreItemCardInfoName({ item }: StoreItemCardInfoNameProps) {
  const isBox = item?.object === 'box'
  const isCollection = item?.object === 'collection'
  const showSideInfo = item.item_type === 'wear'

  return (
    <div className="flex-col gap-3.5">
      <span
        className={twMerge(
          'font-semibold uppercase leading-none text-white',
          'ultrawide:text-3xl'
        )}
      >
        {item.name}
      </span>

      <div className="items-center gap-1.5">
        {showSideInfo && (
          <>
            <span
              className={twMerge(
                'font-medium leading-none text-blue-500',
                item.subtype !== 'def' && 'text-red-500',
                'ultrawide:text-3xl'
              )}
            >
              {item.subtype === 'def' ? 'DEF' : 'ATA'}
            </span>

            <Divider className="h-[11px] w-px max-w-[1px] bg-gray-300" />
          </>
        )}

        <span
          className={twMerge(
            'text-sm text-gray-300',
            'leading-none',
            'ultrawide:text-2xl ultrawide:leading-none'
          )}
        >
          {isBox && 'Caixa'}
          {isCollection && 'Coleção'}
          {!isBox && !isCollection && getItemName(item?.item_type)}
        </span>
      </div>
    </div>
  )
}
