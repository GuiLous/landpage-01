import { BiSolidUpArrow } from 'react-icons/bi'
import { twMerge } from 'tailwind-merge'

import { StoreItem } from '@/functions'

import { CenteredCarousel, CustomIcon } from '@/components/shared'

interface ModalBuyItemCarouselProps {
  data: StoreItem[]
  setActiveItemIndex: (state: number) => void
  setPreviewSelected: (state: number) => void
}
export function ModalBuyItemCarousel({
  data,
  setActiveItemIndex,
  setPreviewSelected,
}: ModalBuyItemCarouselProps) {
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
          '3xl:w-[66px]'
        )}
      />

      <CustomIcon
        icon={BiSolidUpArrow}
        className={twMerge(
          'absolute text-purple-400 text-xl -top-4',
          '3xl:text-lg 3xl:-top-[0.85rem]'
        )}
      />

      <CenteredCarousel
        data={data}
        setActiveItemIndex={setActiveItemIndex}
        setPreviewSelected={setPreviewSelected}
      />
    </div>
  )
}
