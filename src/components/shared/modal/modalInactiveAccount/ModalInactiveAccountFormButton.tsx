'use client'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { FormEvent, useCallback, useState } from 'react'

import { useAppDispatch } from '@/store'
import { addToast } from '@/store/slices/appSlice'
import { updateUser } from '@/store/slices/userSlice'

import { accountsApi } from '@/modelsApi'

import { Button } from '@/components/shared'

import { useAuth, useShowErrorToast } from '@/hooks'

export function ModalInactiveAccountFormButton() {
  const dispatch = useAppDispatch()

  const router = useRouter()

  const getAuth = useAuth()
  const auth = getAuth()

  const showErrorToast = useShowErrorToast()

  const [isFetching, setIsFetching] = useState(false)

  const handleAccountInactivation = useCallback(
    async (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if (isFetching || !auth?.token) return

      const response = await accountsApi.inactivate(auth.token)

      setIsFetching(false)

      if (response.errorMsg) {
        showErrorToast(response.errorMsg)

        setIsFetching(true)
        return
      }

      dispatch(updateUser(null))

      dispatch(
        addToast({
          title: 'Conta inativada com sucesso!',
          variant: 'success',
        })
      )

      Cookies.remove('token')

      router.push('/')
    },
    [auth, dispatch, isFetching, router, showErrorToast]
  )

  return (
    <Button.Root
      disabled={isFetching}
      onClick={handleAccountInactivation}
      className="max-h-[38px] w-full min-w-[246px] max-w-fit px-4"
    >
      {isFetching && <Button.Spinner />}

      <Button.Content
        disabled={isFetching}
        isLoading={isFetching}
        className="text-sm font-semibold"
        loadingText="Inativando"
      >
        Prosseguir com a inativação
      </Button.Content>
    </Button.Root>
  )
}
