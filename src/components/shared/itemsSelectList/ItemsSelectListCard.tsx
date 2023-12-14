import Image from 'next/image'
import { ComponentProps } from 'react'
import { BsCheckCircleFill } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'

import { StoreItem } from '@/functions'

import { CustomIcon } from '@/components/shared'

type ItemsSelectListCardProps = ComponentProps<'div'> & {
  item?: StoreItem
  index: number
  itemSelectedId?: number
  hasItemInUse?: boolean
}

export function ItemsSelectListCard({
  item,
  index,
  itemSelectedId,
  hasItemInUse,
  ...props
}: ItemsSelectListCardProps) {
  const isItemSelected = item?.id === itemSelectedId

  return (
    <div
      className={twMerge(
        'items-center justify-center bg-gray-1100 border border-transparent rounded cursor-pointer h-20 p-2 relative transition-colors w-20',
        'hover:border-purple-400',
        isItemSelected && 'border-purple-400'
      )}
      {...props}
    >
      <Image
        src={item?.foreground_image || ''}
        alt=""
        className={twMerge(
          'object-contain w-full h-full',
          index === 0 && 'w-auto h-auto'
        )}
        sizes="100vw"
        width={80}
        height={80}
      />

      {index > 0 && (
        <span
          className={twMerge(
            'absolute right-1 top-1 text-[0.625rem] transition-colors text-gray-300',
            isItemSelected && 'text-white'
          )}
        >
          #{String(index).padStart(2, '0')}
        </span>
      )}

      {(item?.in_use || (!hasItemInUse && index === 0)) && (
        <CustomIcon
          icon={BsCheckCircleFill}
          className="absolute -bottom-1.5 -right-1 text-white"
          size={18}
        />
      )}
    </div>
  )
}
