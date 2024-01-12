'use client'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { revalidatePath } from '@/utils'

import { accountsApi } from '@/modelsApi'

import { Button } from '@/components/shared'

import { useAuth, useShowErrorToast } from '@/hooks'

interface ModalLogoutButtonsProps {
  setOpen: (state: boolean) => void
}

export function ModalLogoutButtons({ setOpen }: ModalLogoutButtonsProps) {
  const router = useRouter()
  const showErrorToast = useShowErrorToast()

  const auth = useAuth()

  const [fetching, setFetching] = useState(false)

  const handleCloseModal = () => {
    setOpen(false)
  }

  const handleLogout = useCallback(async () => {
    if (!auth?.token) return

    setFetching(true)
    const response = await accountsApi.logout(auth.token)

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)

      setFetching(false)
      return
    }

    Cookies.remove('token')
    Cookies.remove('tried_login')

    revalidatePath({ path: '/' })

    return router.push('/')
  }, [showErrorToast, router, auth?.token])

  return (
    <div className="flex-initial items-center justify-center gap-3.5">
      <Button.Root
        disabled={fetching}
        className="w-full max-w-[102px]"
        neutral
        onClick={handleCloseModal}
      >
        <Button.Content
          disabled={fetching}
          neutral
          className="text-sm font-semibold"
        >
          Cancelar
        </Button.Content>
      </Button.Root>

      <Button.Root
        disabled={fetching}
        className="min-h-[42px] w-full max-w-[102px]"
        type="submit"
        restricted={!fetching}
        onClick={handleLogout}
      >
        {fetching && <Button.Spinner />}

        {!fetching && (
          <Button.Content
            isLoading={fetching}
            className="text-sm font-semibold"
          >
            Sair
          </Button.Content>
        )}
      </Button.Root>
    </div>
  )
}
