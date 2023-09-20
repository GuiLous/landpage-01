'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'

import { httpService, storageService } from '@/services'

import { useAppDispatch } from '@/store'
import { updateMatch } from '@/store/slices/matchSlice'
import { updatePreMatch } from '@/store/slices/preMatchSlice'
import { updateUser } from '@/store/slices/userSlice'

import { Loading } from '@/components/shared'

export default function Auth() {
  const dispatch = useAppDispatch()

  const router = useRouter()
  const searchParams = useSearchParams()

  const getUser = useCallback(
    async (userToken: string) => {
      const response = await httpService.get('accounts/auth/', userToken)

      if (response) {
        storageService.set('token', userToken)
        dispatch(updateUser(response))
        if (response.account) {
          if (response.account.pre_match) {
            dispatch(updatePreMatch(response.account.pre_match))
          } else if (response.account.match) {
            dispatch(updateMatch(response.account.match))
          }
        }
      } else {
        router.push('/')
      }
    },
    [dispatch, router]
  )

  useEffect(() => {
    const userToken = searchParams.get('token')

    if (userToken) {
      getUser(userToken)
    }
  }, [getUser, searchParams])

  return (
    <Loading.Overlay>
      <Loading.Gif />
    </Loading.Overlay>
  )
}
