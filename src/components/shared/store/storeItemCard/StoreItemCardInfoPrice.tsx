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
      <div
        className={twMerge(
          'relative max-fit flex-initial w-6 h-6',
          'ultrawide:w-12 ultrawide:h-12'
        )}
      >
        <Image
          src={reloadCredits}
          alt="Reload Credits"
          fill
          quality={40}
          priority
        />
      </div>

      <span
        className={twMerge(
          'text-xl font-bold text-white',
          'leading-none',
          'ultrawide:text-4xl'
        )}
      >
        {item.price} RC
      </span>

      {item?.discount > 0 && (
        <span
          className={twMerge(
            'text-sm text-red-500 line-through',
            'leading-none',
            'ultrawide:text-xl ultrawide:leading-none'
          )}
        >
          {calcOriginalValueByPercentage(item.price, item.discount)} RC
        </span>
      )}
    </div>
  )
}
