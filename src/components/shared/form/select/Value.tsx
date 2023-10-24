'use client'

import * as Select from '@radix-ui/react-select'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type ValueProps = ComponentProps<typeof Select.Value>

export function Value({ children, className, ...props }: ValueProps) {
  if (!children) {
    return <Select.Value {...props} />
  }

  return (
    <Select.Value {...props}>
      <span
        className={twMerge(
          'flex items-center text-xs text-gray-300',
          className
        )}
      >
        {children}
      </span>
    </Select.Value>
  )
}
