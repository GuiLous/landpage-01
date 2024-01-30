'use client'

import { useCallback } from 'react'

import { revalidatePath } from '@/utils'

import { useAppStore } from '@/store/appStore'

export function useShowErrorToast() {
  const { addToast } = useAppStore()

  const showErrorToast = useCallback(
    (error: string) => {
      addToast({
        content: error,
        variant: 'error',
      })
      revalidatePath({ path: '/' })
    },
    [addToast]
  )

  return showErrorToast
}
