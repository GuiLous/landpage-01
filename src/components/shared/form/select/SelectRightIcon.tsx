'use client'

import { ElementType } from 'react'
import { IconBaseProps } from 'react-icons'
import { twMerge } from 'tailwind-merge'

import { useSelectContext } from '@/contexts/select'

interface SelectRightIconProps extends IconBaseProps {
  icon: ElementType
}

export function SelectRightIcon({
  icon: Icon,
  className,
  ...props
}: SelectRightIconProps) {
  const { isChecked } = useSelectContext()

  return (
    <Icon
      className={twMerge(
        'text-gray-300 transition',
        isChecked && 'rotate-180 text-white',
        className
      )}
      {...props}
    />
  )
}
