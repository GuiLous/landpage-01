'use client'

import { ComponentProps, ReactNode, useEffect, useRef } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

import { useSelectContext } from '@/contexts/select'

const select = tv({
  base: 'flex-col relative',
})

type SelectRootProps = ComponentProps<'div'> &
  VariantProps<typeof select> & {
    children?: ReactNode
  }

export function SelectRoot({ className, children, ...props }: SelectRootProps) {
  const { isChecked, closeSelect } = useSelectContext()

  const selectContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const closeSelectEvent = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || (e.key === ' ' && isChecked)) {
        closeSelect()
      }
    }

    window.addEventListener('keydown', closeSelectEvent)

    return () => {
      window.removeEventListener('keydown', closeSelectEvent)
    }
  }, [isChecked, closeSelect])

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        selectContainerRef.current &&
        !selectContainerRef.current.contains(event.target)
      ) {
        closeSelect()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [closeSelect])

  return (
    <div className={select({ className })} ref={selectContainerRef} {...props}>
      {children}
    </div>
  )
}
