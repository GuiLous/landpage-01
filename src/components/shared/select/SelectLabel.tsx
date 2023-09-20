'use client'

import { twMerge } from 'tailwind-merge'

import { useSelectContext } from '@/contexts/select'

interface SelectLabelProps {
  className?: string
  labelText: string
}

export function SelectLabel({ labelText, className }: SelectLabelProps) {
  const { isChecked, isFocused } = useSelectContext()

  return (
    <label
      htmlFor="options-view-button"
      className={twMerge(
        'text-[0.75rem] tracking-[0.0225rem]',
        (isChecked || isFocused) && 'text-purple-400',
        className
      )}
    >
      {labelText}
    </label>
  )
}
