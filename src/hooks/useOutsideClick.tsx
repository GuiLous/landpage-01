'use client'

import { RefObject, useEffect } from 'react'

interface useOutsideClickProps {
  ref: RefObject<HTMLElement>
  handler: () => void
}

export function useOutsideClick({ handler, ref }: useOutsideClickProps) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current) {
        if (!ref.current.contains(event.target as Node)) {
          handler()
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, handler])
}
