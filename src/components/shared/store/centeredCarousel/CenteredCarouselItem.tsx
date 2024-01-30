import Image from 'next/image'
import { BsCheckCircleFill } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'

import { CustomIcon } from '@/components/shared'

interface CenteredCarouselItemProps {
  foreground_image: string
  index: number
  activeSlide: number
  itemId: number
  in_use?: boolean
  isInventory: boolean
  hasItemInUse: boolean
}

export function CenteredCarouselItem({
  activeSlide,
  foreground_image,
  index,
  in_use = false,
  isInventory,
  hasItemInUse,
  itemId,
}: CenteredCarouselItemProps) {
  const isNullItem = itemId === 0

  return (
    <div
      className={twMerge(
        'bg-gray-700/40 rounded flex-col cursor-pointer h-full overflow-hidden p-1 relative',
        activeSlide === index && 'border border-purple-400',
        isNullItem && 'items-center justify-center gap-2'
      )}
    >
      {isNullItem ? (
        <div className="relative h-[18px] min-w-[18px] max-w-fit flex-initial 3xl:h-4 3xl:min-w-4 ">
          <Image
            src={foreground_image}
            alt=""
            className="object-scale-down"
            fill
            priority
            sizes="100%"
          />
        </div>
      ) : (
        <Image
          src={foreground_image}
          alt=""
          className="object-scale-down p-0.5"
          fill
          priority
          sizes="100%"
        />
      )}

      {isInventory && isNullItem && (
        <span className="text-[0.625rem] leading-none text-gray-300">
          Nenhum
        </span>
      )}

      {isInventory && (in_use || (!hasItemInUse && isNullItem)) && (
        <CustomIcon
          icon={BsCheckCircleFill}
          className={twMerge(
            'text-sm absolute bottom-1 right-1 text-white',
            '3xl:text-xs 3xl:bottom-0.5 3xl:right-0.5'
          )}
        />
      )}
    </div>
  )
}
