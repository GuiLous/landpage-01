import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import { calcOriginalValueByPercentage, getItemName } from '@/utils'

import { StoreItem } from '@/functions'

import { Divider } from '@/components/shared'

import reloadCredits from '@/assets/images/reload_credits.png'

interface StoreItemCardInfoProps {
  item: StoreItem
}

export function StoreItemCardInfo({ item }: StoreItemCardInfoProps) {
  const isBox = item?.object === 'box'
  const isCollection = item?.object === 'collection'

  return (
    <main className="flex-initial flex-col gap-8">
      <div className="flex-col gap-3.5">
        <span className="font-semibold uppercase leading-none text-white">
          {item.name}
        </span>

        <div>
          {item?.subtype && (
            <>
              <span
                className={twMerge(
                  'font-medium leading-none text-blue-500',
                  item.subtype !== 'def' && 'text-red-500'
                )}
              >
                {item.subtype === 'def' ? 'DEF' : 'ATA'}
              </span>

              <Divider className="h-[11px] w-px max-w-[1px] bg-gray-300" />
            </>
          )}

          <span className="text-sm leading-none text-gray-300">
            {isBox && 'Caixa'}
            {isCollection && 'Coleção'}
            {!isBox && !isCollection && getItemName(item?.item_type)}
          </span>
        </div>
      </div>

      <div className="items-center gap-2">
        <Image
          src={reloadCredits}
          alt="Reload Credits"
          width={24}
          height={24}
        />

        <span className="text-xl font-bold leading-none text-white">
          {item.price} RC
        </span>

        {item?.discount > 0 && (
          <span className="text-sm leading-none text-red-500 line-through">
            {calcOriginalValueByPercentage(item.price, item.discount)} RC
          </span>
        )}
      </div>
    </main>
  )
}
