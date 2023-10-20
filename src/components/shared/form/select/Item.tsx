'use client'

import * as Select from '@radix-ui/react-select'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type ItemProps = ComponentProps<typeof Select.Item>

export function Item({ children, ...props }: ItemProps) {
  return (
    <Select.Item
      className={twMerge(
        'flex items-center gap-2 px-3 py-2.5',
        'data-[highlighted]:bg-gray-700',
        'data-[highlighted]:outline-none'
      )}
      {...props}
    >
      {children}
    </Select.Item>
  )
}
