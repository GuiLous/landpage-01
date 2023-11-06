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

export function ModalDeleteAccountFormButton() {
  const dispatch = useAppDispatch()

  const router = useRouter()

  const getAuth = useAuth()
  const auth = getAuth()

  const showErrorToast = useShowErrorToast()

  const [isFetching, setIsFetching] = useState(false)

  const handleDeleteAccount = useCallback(
    async (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if (isFetching || !auth?.token) return

      setIsFetching(true)

      const response = await accountsApi.delete(auth.token)

      if (response.errorMsg) {
        showErrorToast(response.errorMsg)

        setIsFetching(false)
        return
      }

      dispatch(updateUser(null))

      dispatch(
        addToast({
          title: 'Conta excluída com sucesso!',
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
      onClick={handleDeleteAccount}
      className="max-h-[38px] w-full min-w-[246px] max-w-fit px-4"
    >
      {isFetching && <Button.Spinner />}

      <Button.Content
        disabled={isFetching}
        isLoading={isFetching}
        className="text-sm font-semibold"
        loadingText="Deletando"
      >
        Prosseguir com a exclusão
      </Button.Content>
    </Button.Root>
  )
}
