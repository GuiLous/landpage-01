import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import { calcOriginalValueByPercentage } from '@/utils'

import { StoreItem } from '@/functions'

const reloadCredits = '/assets/images/reload_credits.png'

interface StoreItemCardInfoPriceProps {
  item: StoreItem
}

export function StoreItemCardInfoPrice({ item }: StoreItemCardInfoPriceProps) {
  return (
    <div className="items-center gap-2">
      <Image src={reloadCredits} alt="Reload Credits" width={24} height={24} />

      <span className={twMerge('text-xl font-bold text-white', 'leading-none')}>
        {item.price} RC
      </span>

      {item?.discount > 0 && (
        <span
          className={twMerge(
            'text-sm text-red-500 line-through',
            'leading-none'
          )}
        >
          {calcOriginalValueByPercentage(item.price, item.discount)} RC
        </span>
      )}
    </div>
  )
}
