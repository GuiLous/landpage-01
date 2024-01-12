import { twMerge } from 'tailwind-merge'

interface ModalReloadCoinsCardPriceProps {
  price: string
}

export function ModalReloadCoinsCardPrice({
  price,
}: ModalReloadCoinsCardPriceProps) {
  return (
    <span
      className={twMerge(
        'z-10 font-medium text-white text-xl',
        'leading-none',
        '3xl:text-base'
      )}
    >
      {price}
    </span>
  )
}
