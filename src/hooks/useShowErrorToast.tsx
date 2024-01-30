'use client'

import { useCallback } from 'react'

import { useAppStore } from '@/store/appStore'

export function useShowErrorToast() {
  const { addToast } = useAppStore()

  const showErrorToast = useCallback(
    (error: string) => {
      addToast({
        content: error,
        variant: 'error',
      })
    },
    [addToast]
  )

  return showErrorToast
}
