'use client'

import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface StoreItemCardRootProps extends ComponentProps<'div'> {
  purchased?: boolean
  children: ReactNode
}

export function StoreItemCardRoot({
  purchased = false,
  children,
  ...props
}: StoreItemCardRootProps) {
  return (
    <div
      className={twMerge(
        'relative rounded-lg p-px transition-colors',
        !purchased && 'hover:bg-gradient_store_item',
        'group'
      )}
      {...props}
    >
      {children}
    </div>
  )
}
