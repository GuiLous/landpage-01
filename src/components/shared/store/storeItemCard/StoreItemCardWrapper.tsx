import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { StoreItemCardPurchased } from './StoreItemCardPurchased'

interface StoreItemCardWrapperProps {
  children: ReactNode
  purchased?: boolean
}

export function StoreItemCardWrapper({
  purchased,
  children,
}: StoreItemCardWrapperProps) {
  return (
    <>
      <div
        className={twMerge(
          'relative z-10 h-[430px] max-h-[430px] cursor-pointer justify-between flex-col gap-4 overflow-hidden rounded-lg bg-gray-1100 p-4',
          '3xl:h-[390px] 3xl:max-h-[390px] 3xl:p-3.5',
          'ultrawide:h-[620px] ultrawide:max-h-[620px]'
        )}
      >
        {children}
      </div>

      {purchased && <StoreItemCardPurchased />}
    </>
  )
}
