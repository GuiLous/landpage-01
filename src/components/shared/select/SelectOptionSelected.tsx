'use client'

import { twMerge } from 'tailwind-merge'

import { useSelectContext } from '@/contexts/select'

interface SelectOptionSelectedProps {
  placeholder?: string
  className?: string
  value?: string
}

export function SelectOptionSelected({
  placeholder,
  className,
  value,
}: SelectOptionSelectedProps) {
  const { itemSelected } = useSelectContext()

  return (
    <div
      className={twMerge(
        'text-sm tracking-[0.02625rem] text-gray-300 overflow-hidden ',
        (itemSelected || value) && 'text-white',
        className
      )}
    >
      <p className="overflow-hidden text-ellipsis whitespace-nowrap">
        {value && value}
        {!value && itemSelected && itemSelected.label}
        {!value && !itemSelected && placeholder}
      </p>
    </div>
  )
}
