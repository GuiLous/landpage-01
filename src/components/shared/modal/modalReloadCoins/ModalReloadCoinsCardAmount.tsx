import { twMerge } from 'tailwind-merge'

interface ModalReloadCoinsCardAmountProps {
  amount: number
}

export function ModalReloadCoinsCardAmount({
  amount,
}: ModalReloadCoinsCardAmountProps) {
  return (
    <div
      className={twMerge(
        'flex-col items-center justify-center gap-3.5',
        '3xl:gap-2.5'
      )}
    >
      <span
        className={twMerge(
          'z-10 font-bold leading-none text-white text-[1.75rem]',
          '3xl:text-[1.375rem]'
        )}
      >
        {amount}
      </span>
    </div>
  )
}
