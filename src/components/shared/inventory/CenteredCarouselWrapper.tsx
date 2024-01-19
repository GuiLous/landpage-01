import { RxTriangleUp } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'

import { StoreItem } from '@/functions'

import { CenteredCarousel, CustomIcon } from '@/components/shared'

interface CenteredCarouselWrapperProps {
  data: StoreItem[]
  isInventory?: boolean
  hasItemInUse?: boolean
  setActiveItemIndex: (state: number) => void
  setPreviewSelected?: (state: number) => void
}

export function CenteredCarouselWrapper({
  data,
  setActiveItemIndex,
  setPreviewSelected,
  isInventory = false,
  hasItemInUse = false,
}: CenteredCarouselWrapperProps) {
  return (
    <div
      className={twMerge(
        'items-center border-t border-t-gray-700 justify-center pt-5 relative select-none',
        '3xl:pt-2.5'
      )}
    >
      <div
        className={twMerge(
          'absolute -top-px h-0.5 w-[86px] bg-purple-400',
          '3xl:w-[66px]',
          isInventory && 'h-[3px] -top-0.5 w-[88px] 3xl:w-[68px]'
        )}
      />

      <CustomIcon
        icon={RxTriangleUp}
        className={twMerge(
          'absolute text-purple-400 text-3xl -top-[1.1rem]',
          '3xl:text-2xl 3xl:-top-[0.88rem]',
          isInventory && '-top-5'
        )}
      />

      <CenteredCarousel
        data={data}
        setActiveItemIndex={setActiveItemIndex}
        setPreviewSelected={setPreviewSelected}
        isInventory={isInventory}
        hasItemInUse={hasItemInUse}
      />
    </div>
  )
}
