'use client'

import { twMerge } from 'tailwind-merge'

import { useSelectContext } from '@/contexts/select'

interface SelectOptionSelectedProps {
  placeholder?: string
  className?: string
}

export function SelectOptionSelected({
  placeholder,
  className,
}: SelectOptionSelectedProps) {
  const { itemSelected } = useSelectContext()

  return (
    <div
      className={twMerge(
        'text-sm tracking-[0.02625rem] text-gray-300',
        itemSelected && 'text-white',
        className
      )}
    >
      {itemSelected ? itemSelected.label : placeholder}
    </div>
  )
}
