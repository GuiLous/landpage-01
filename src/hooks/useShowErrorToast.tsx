'use client'

import { useCallback } from 'react'

import { revalidatePath } from '@/utils'

import { useAppStore } from '@/store/appStore'

export function useShowErrorToast() {
  const showErrorToast = useCallback((error: string) => {
    useAppStore.getState().addToast({
      content: error,
      variant: 'error',
    })
    revalidatePath({ path: '/' })
  }, [])

  return showErrorToast
}
