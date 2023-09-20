'use client'

import { ReactNode, useEffect } from 'react'

import { useSelectContext } from '@/contexts/select'

interface SelectInputProps {
  children?: ReactNode
  onChange?: (value: string) => void
}

export function SelectInput({ children, onChange }: SelectInputProps) {
  const { isChecked, setIsChecked, setIsFocused, itemSelected } =
    useSelectContext()

  useEffect(() => {
    if (onChange && itemSelected?.value) {
      onChange(itemSelected?.value)
    }
  }, [itemSelected, onChange])

  return (
    <div className="gap-2">
      {children}

      <input
        type="checkbox"
        id="options-view-button"
        checked={isChecked}
        onChange={() => setIsChecked((prevState) => !prevState)}
        onFocus={() => setIsFocused(true)}
        style={{
          all: 'unset',
          position: 'absolute',
          inset: '0',
          cursor: 'pointer',
          zIndex: '3',
        }}
      />
    </div>
  )
}
