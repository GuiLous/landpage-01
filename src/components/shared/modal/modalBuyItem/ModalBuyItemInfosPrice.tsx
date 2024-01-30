import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import { calcOriginalValueByPercentage } from '@/utils'

const reloadCredits = '/assets/images/reload_credits.png'

interface ModalBuyItemInfosPriceProps {
  price: number
  discount: number
}

export function ModalBuyItemInfosPrice({
  price,
  discount,
}: ModalBuyItemInfosPriceProps) {
  return (
    <div className="items-center gap-2">
      <div
        className={twMerge(
          'relative max-w-8 min-w-8 min-h-8 max-h-8',
          '3xl:max-w-7 3xl:min-w-3 3xl:min-h-7 3xl:max-h-7'
        )}
      >
        <Image
          src={reloadCredits}
          alt="Reload Credits"
          fill
          sizes="100%"
          priority
          className="object-cover"
        />
      </div>

      <h2
        className={twMerge(
          'leading-none text-white font-bold text-[1.75rem]',
          '3xl:text-2xl'
        )}
      >
        {price} RC
      </h2>

      {discount > 0 && (
        <span
          className={twMerge(
            'text-lg font-medium leading-none text-red-500 line-through',
            '3xl:text-base'
          )}
        >
          {calcOriginalValueByPercentage(price, discount)} RC
        </span>
      )}
    </div>
  )
}
