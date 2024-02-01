import Image from 'next/image'
import { ComponentProps } from 'react'
import { BsCheckCircleFill } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'

import { staticBlurDataUrl } from '@/utils'

import { StoreItem } from '@/functions'

import { CustomIcon } from '@/components/shared'

type ItemsSelectListCardProps = ComponentProps<'div'> & {
  item?: StoreItem
  index: number
  itemSelectedId?: number
  hasItemInUse?: boolean
  isAccountPage?: boolean
}

export function ItemsSelectListCard({
  item,
  index,
  itemSelectedId,
  hasItemInUse,
  isAccountPage = false,
  ...props
}: ItemsSelectListCardProps) {
  const isItemSelected = item?.id === itemSelectedId

  return (
    <div
      className={twMerge(
        'items-center flex-col gap-1.5 justify-center bg-gray-700/30 border border-transparent rounded cursor-pointer h-20 relative transition-colors w-20',
        '3xl:w-16 3xl:h-16',
        'hover:border-purple-400',
        isItemSelected && 'border-purple-400',
        isAccountPage &&
          'bg-gray-1200/50 border-gray-700/40 h-14 w-14 3xl:w-14 3xl:h-14',
        isItemSelected && isAccountPage && 'border-purple-400'
      )}
      {...props}
    >
      <div
        className={twMerge(
          'flex-col rounded h-full items-center justify-center gap-1.5',
          isAccountPage && 'overflow-hidden p-0'
        )}
      >
        <div
          className={twMerge(
            'h-full',
            index === 0 &&
              !isAccountPage &&
              'relative h-[18px] min-w-[18px] max-w-fit flex-initial 3xl:h-4 3xl:min-w-4 '
          )}
        >
          {isAccountPage ? (
            <Image
              src={item?.preview_image || ''}
              alt=""
              className={twMerge(
                'object-scale-down',
                index !== 0 && 'p-2 3xl:p-1',
                isAccountPage && 'object-cover p-0 rounded'
              )}
              fill
              priority
              sizes="100vw"
              placeholder="blur"
              blurDataURL={staticBlurDataUrl()}
            />
          ) : (
            <Image
              src={item?.foreground_image || ''}
              alt=""
              className={twMerge(
                'object-scale-down',
                index !== 0 && 'p-2 3xl:p-1',
                isAccountPage && 'object-cover p-0 rounded'
              )}
              fill
              priority
              sizes="100vw"
              placeholder="blur"
              blurDataURL={staticBlurDataUrl()}
            />
          )}
        </div>

        {item?.id === 0 && (
          <span className="text-[0.625rem] leading-none text-gray-300">
            Nenhum
          </span>
        )}
      </div>

      {(item?.in_use || (!hasItemInUse && index === 0)) && (
        <CustomIcon
          icon={BsCheckCircleFill}
          className={twMerge(
            'text-lg absolute -bottom-1.5 -right-1 text-white',
            '3xl:text-base 3xl:-bottom-1 3xl:-right-1.5',
            isAccountPage && 'text-sm -bottom-1'
          )}
        />
      )}
    </div>
  )
}
