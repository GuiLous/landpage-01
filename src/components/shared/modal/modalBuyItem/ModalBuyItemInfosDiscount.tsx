import { twMerge } from 'tailwind-merge'

interface ModalBuyItemInfosDiscountProps {
  discount: number
}

export function ModalBuyItemInfosDiscount({
  discount,
}: ModalBuyItemInfosDiscountProps) {
  return (
    <div className={twMerge('items-center gap-4', '3xl:gap-3.5')}>
      {discount > 0 && (
        <div
          className={twMerge(
            'items-center justify-center',
            'bg-red-500 rounded-sm max-w-fit p-1.5',
            '3xl:p-1'
          )}
        >
          <span
            className={twMerge(
              'text-white font-medium text-sm',
              'leading-none',
              '3xl:text-xs'
            )}
          >
            {Number(discount).toFixed(0)}% OFF
          </span>
        </div>
      )}
    </div>
  )
}
