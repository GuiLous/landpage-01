import Image from 'next/image'
import { BsCheckCircleFill } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'

import { CustomIcon } from '@/components/shared'

interface CenteredCarouselItemProps {
  foreground_image: string
  index: number
  activeSlide: number
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
}: CenteredCarouselItemProps) {
  return (
    <div
      className={twMerge(
        'bg-gray-700/40 rounded flex-col cursor-pointer h-full overflow-hidden p-1 relative',
        activeSlide === index && 'border border-purple-400',
        index === 0 && 'items-center justify-center gap-2'
      )}
    >
      {index === 0 ? (
        <div className="relative h-[18px] min-w-[18px] max-w-fit flex-initial 3xl:h-4 3xl:min-w-4 ">
          <Image
            src={foreground_image}
            alt=""
            className="object-scale-down"
            fill
            sizes="100%"
          />
        </div>
      ) : (
        <Image
          src={foreground_image}
          alt=""
          className="object-scale-down p-0.5"
          fill
          sizes="100%"
        />
      )}

      {isInventory && index === 0 && (
        <span className="text-[0.625rem] leading-none text-gray-300">
          Nenhum
        </span>
      )}

      {isInventory && (in_use || (!hasItemInUse && index === 0)) && (
        <CustomIcon
          icon={BsCheckCircleFill}
          className={twMerge(
            'text-sm absolute bottom-1 right-1 text-white',
            '3xl:text-base 3xl:-bottom-1 3xl:-right-1.5'
          )}
        />
      )}
    </div>
  )
}
