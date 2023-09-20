'use client'

import { twMerge } from 'tailwind-merge'

import { useSelectContext } from '@/contexts/select'

interface SelectOptionsProps {
  className?: string
  children?: React.ReactNode
}

export function SelectOptions({ className, children }: SelectOptionsProps) {
  const { isChecked } = useSelectContext()

  if (!isChecked) return null

  return (
    <ul
      className={twMerge(
        'absolute top-16 z-10 -mt-[1.35rem] max-h-72 w-[inherit] animate-fade overflow-hidden overflow-y-auto rounded-[4px] border-0 bg-gray-800',
        className
      )}
    >
      {children}
    </ul>
  )
}
