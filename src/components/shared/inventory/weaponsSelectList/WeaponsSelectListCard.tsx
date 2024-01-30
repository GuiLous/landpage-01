import Image from 'next/image'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { WeaponNameType, WeaponObject } from '@/utils'

type WeaponsSelectListCardProps = ComponentProps<'div'> & {
  item: WeaponObject
  weaponSelected: WeaponNameType
}

export function WeaponsSelectListCard({
  item,
  weaponSelected,
  ...props
}: WeaponsSelectListCardProps) {
  const isItemSelected = weaponSelected === item.name

  return (
    <div className={twMerge('flex-col flex-initial gap-2', '3xl:gap-1.5')}>
      <div className="flex-initial">
        <span
          className={twMerge(
            'text-sm font-medium text-gray-300 transition-colors uppercase',
            isItemSelected && 'text-white',
            '3xl:text-xs'
          )}
        >
          {item.name}
        </span>
      </div>

      <div
        className={twMerge(
          'relative min-h-[110px] transition-colors cursor-pointer min-w-[345px] border border-transparent flex-initial items-center justify-center overflow-hidden rounded-lg bg-gray-700/30',
          'hover:border-purple-400',
          isItemSelected && 'border-purple-400',
          '3xl:min-h-[80px] 3xl:min-w-[290px]'
        )}
        {...props}
      >
        <Image
          src={item.gunImg}
          alt="weapon image"
          className="object-scale-down px-3.5 py-4"
          fill
          priority
          sizes="100%"
        />
      </div>
    </div>
  )
}
