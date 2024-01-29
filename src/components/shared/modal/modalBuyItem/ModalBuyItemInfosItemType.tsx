import { twMerge } from 'tailwind-merge'

import { getItemName } from '@/utils'

import { ItemSubType, ItemType } from '@/functions'

import { Divider } from '@/components/shared'

interface ModalBuyItemInfosItemTypeProps {
  subtype?: ItemSubType
  item_type: ItemType
}

export function ModalBuyItemInfosItemType({
  subtype,
  item_type,
}: ModalBuyItemInfosItemTypeProps) {
  const isDefSubType = subtype === 'def'
  const showSideInfo = item_type === 'wear'

  return (
    <div className="items-center gap-1.5">
      {showSideInfo && (
        <>
          <span
            className={twMerge(
              'leading-none font-semibold text-red-500',
              isDefSubType && 'text-blue-500',
              '3xl:text-sm'
            )}
          >
            {isDefSubType ? 'DEF' : 'ATA'}
          </span>

          <Divider className="h-[11px] w-px max-w-[1px] bg-gray-300" />
        </>
      )}

      <h2
        className={twMerge(
          'text-gray-300 text-sm',
          'leading-none',
          '3xl:text-xs'
        )}
      >
        {getItemName(item_type)}
      </h2>
    </div>
  )
}
