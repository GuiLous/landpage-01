'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { Loading } from '@/components/shared'

import { useInitializeReducers } from '@/hooks'

export default function Auth() {
  const searchParams = useSearchParams()
  const { initializeReducers } = useInitializeReducers()

  useEffect(() => {
    const userToken = searchParams.get('token')

    initializeReducers(userToken)
  }, [initializeReducers, searchParams])

  return (
    <Loading.Overlay>
      <Loading.Gif />
    </Loading.Overlay>
  )
}
