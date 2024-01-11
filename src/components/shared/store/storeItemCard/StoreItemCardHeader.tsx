import Image from 'next/image'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { twMerge } from 'tailwind-merge'

import { StoreItem } from '@/functions'

import { CustomIcon } from '@/components/shared'

interface StoreItemCardHeaderProps {
  item: StoreItem
  purchased?: boolean
}

export function StoreItemCardHeader({
  item,
  purchased = false,
}: StoreItemCardHeaderProps) {
  return (
    <header className="relative max-h-[289px] items-center justify-center overflow-hidden rounded bg-gray-700/40 p-5">
      <CustomIcon
        icon={IoMdInformationCircleOutline}
        className={twMerge(
          'absolute right-3 top-3 text-[1.375rem] text-white opacity-0 transition-opacity',
          !purchased && 'group-hover:opacity-100'
        )}
      />

      <Image
        src={item.foreground_image}
        alt={item.name}
        fill
        sizes="100%"
        className="object-scale-down p-2"
        draggable={false}
        priority
      />

      {item.discount > 0 && (
        <div className="absolute bottom-3 left-3 max-w-fit flex-initial items-center justify-center rounded-sm bg-red-500 p-1.5">
          <span
            className={twMerge(
              'text-sm font-medium text-white',
              'leading-none'
            )}
          >
            {Number(item.discount).toFixed(0)}% OFF
          </span>
        </div>
      )}
    </header>
  )
}
