'use client'

import { usePathname } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

import { ROUTES_TO_INITIALIZE_SLICES } from '@/constants'

import { Loading } from '@/components/shared'

import { useAuth, useInitializeSlices } from '@/hooks'

interface InitializeSlicesRoutesProps {
  children: ReactNode
}

export function InitializeSlices({ children }: InitializeSlicesRoutesProps) {
  const { isLoading, initializeSlices } = useInitializeSlices()
  const pathname = usePathname()

  const auth = useAuth()

  const showLoading =
    isLoading &&
    pathname !== '/' &&
    pathname !== '/conta-inativa' &&
    ROUTES_TO_INITIALIZE_SLICES.some((route) => pathname.startsWith(route))

  useEffect(() => {
    if (
      ROUTES_TO_INITIALIZE_SLICES.some((route) => pathname.startsWith(route)) &&
      pathname !== '/' &&
      pathname !== '/conta-inativa' &&
      auth?.is_active &&
      auth.is_verified &&
      auth.username
    ) {
      initializeSlices()
    }
  }, [
    auth?.is_active,
    auth?.is_verified,
    auth?.username,
    initializeSlices,
    pathname,
  ])

  return (
    <>
      {showLoading && (
        <Loading.Overlay>
          <Loading.Gif />
        </Loading.Overlay>
      )}

      {!showLoading && children}
    </>
  )
}
