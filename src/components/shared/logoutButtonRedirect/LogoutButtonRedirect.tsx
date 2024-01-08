'use client'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { revalidatePath } from '@/utils'

import { accountsApi } from '@/modelsApi'

import { Button } from '@/components/shared'

import { useAuth, useShowErrorToast } from '@/hooks'

export function LogoutButtonRedirect() {
  const getAuth = useAuth()
  const auth = getAuth()

  const showErrorToast = useShowErrorToast()
  const router = useRouter()

  const [isFetching, setIsFetching] = useState(false)

  const handleLogout = useCallback(
    async (e: any) => {
      e.preventDefault()

      setIsFetching(true)

      if (!auth?.token) return

      const response = await accountsApi.logout(auth.token)

      if (response.errorMsg) {
        showErrorToast(response.errorMsg)

        setIsFetching(false)
        return
      }

      Cookies.remove('token')
      Cookies.remove('tried_login')

      revalidatePath({ path: '/' })
      return router.push('/')
    },
    [showErrorToast, auth, router]
  )

  return (
    <Button.Root className="w-60 " disabled={isFetching} onClick={handleLogout}>
      {isFetching && <Button.Spinner />}

      <Button.Content
        isLoading={isFetching}
        disabled={isFetching}
        className="text-center text-sm font-bold"
        loadingText="Aguarde"
      >
        Voltar para o início
      </Button.Content>
    </Button.Root>
  )
}
