'use client'

import { useCallback, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

import { Item, useSelectContext } from '@/contexts/select'

interface SelectOptionProps {
  className?: string
  item: Item
  index: number
  items: Item[]
}

export function SelectOption({
  className,
  item,
  index,
  items,
}: SelectOptionProps) {
  const {
    isChecked,
    setItemSelected,
    itemSelected,
    closeSelect,
    optionInputRef,
  } = useSelectContext()

  const isItemSelected = itemSelected?.value === item.value

  const handleChangeItem = useCallback(
    (e: any, item: Item) => {
      if (e.nativeEvent.pointerType === 'mouse') closeSelect()
      setItemSelected(item)
    },
    [closeSelect, setItemSelected]
  )

  useEffect(() => {
    if (optionInputRef.current && isChecked) {
      optionInputRef.current.focus()

      if (optionInputRef.current.value === items[0].value && !items[0].disabled)
        setItemSelected(items[0])
    }
  }, [optionInputRef, isChecked, items, setItemSelected])

  return (
    <li
      id="option"
      className={twMerge(
        'relative flex w-full items-center p-3.5 transition-colors hover:bg-gray-700',
        isItemSelected && 'bg-gray-700',
        item.disabled && 'hover:bg-gray-800',
        className
      )}
    >
      <input
        type="radio"
        value={item.value}
        data-label={item}
        checked={isItemSelected}
        onChange={(e) =>
          item.disabled ? undefined : handleChangeItem(e, item)
        }
        onClick={(e: any) =>
          e.nativeEvent.pointerType === 'mouse' ? closeSelect() : undefined
        }
        style={{
          all: 'unset',
          position: 'absolute',
          inset: '0',
          cursor: item.disabled ? 'default' : 'pointer',
        }}
        ref={isItemSelected || index === 0 ? optionInputRef : undefined}
      />
      <span className="text-xs text-white">{item.label}</span>
    </li>
  )
}
