'use client'

import { useAppDispatch } from '@/store'
import { addToast } from '@/store/slices/appSlice'

export function useShowErrorToast() {
  const dispatch = useAppDispatch()

  const showErrorToast = (error: string) => {
    dispatch(
      addToast({
        content: error,
        variant: 'error',
      })
    )
  }

  return showErrorToast
}
