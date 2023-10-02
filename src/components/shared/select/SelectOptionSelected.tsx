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
        'text-sm tracking-[0.02625rem] text-gray-300 overflow-hidden ',
        itemSelected && 'text-white',
        className
      )}
    >
      <p className="overflow-hidden text-ellipsis whitespace-nowrap">
        {itemSelected ? itemSelected.label : placeholder}
      </p>
    </div>
  )
}
