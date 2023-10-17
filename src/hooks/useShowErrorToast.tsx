'use client'

import { useCallback } from 'react'

import { useAppDispatch } from '@/store'
import { addToast } from '@/store/slices/appSlice'

export function useShowErrorToast() {
  const dispatch = useAppDispatch()

  const showErrorToast = useCallback(
    (error: string) => {
      dispatch(
        addToast({
          content: error,
          variant: 'error',
        })
      )
    },
    [dispatch]
  )

  return showErrorToast
}
