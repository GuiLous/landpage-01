'use client'

import * as Select from '@radix-ui/react-select'
import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export interface ItemTextProps extends ComponentProps<typeof Select.ItemText> {
  children: ReactNode
}

export function ItemText({ children, className }: ItemTextProps) {
  return (
    <Select.ItemText asChild>
      <span
        className={twMerge(
          'flex items-center text-left text-xs leading-5 text-white',
          'ultrawide:text-xl',
          className
        )}
      >
        {children}
      </span>
    </Select.ItemText>
  )
}
