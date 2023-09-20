'use client'

import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { useSelectContext } from '@/contexts/select'

interface SelectOptionSelectedWrapperProps {
  className?: string
  children?: ReactNode
}

export function SelectOptionSelectedWrapper({
  children,
  className,
}: SelectOptionSelectedWrapperProps) {
  const { isChecked, isFocused } = useSelectContext()

  return (
    <div
      className={twMerge(
        'flex items-center justify-between rounded-[4px] border border-gray-700 bg-gray-1200 px-3 py-[0.57rem]',
        (isChecked || isFocused) &&
          'outline-none ring-1 ring-purple-400 hover:ring-purple-400',
        className
      )}
    >
      {children}
    </div>
  )
}
