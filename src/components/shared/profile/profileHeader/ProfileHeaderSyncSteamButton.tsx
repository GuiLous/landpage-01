'use client'

import { useCallback, useState } from 'react'
import { BiRefresh } from 'react-icons/bi'
import { twMerge } from 'tailwind-merge'

import { revalidate } from '@/utils'

import { useUserStore } from '@/store/userStore'

import { accountsApi } from '@/modelsApi'

import { Button, Tooltip } from '@/components/shared'

import { useAuth, useShowErrorToast } from '@/hooks'

export function ProfileHeaderSyncSteamButton() {
  const showErrorToast = useShowErrorToast()

  const getAuth = useAuth()
  const auth = getAuth()

  const [isFetching, setIsFetching] = useState(false)

  const handleUpdateProfile = useCallback(async () => {
    if (!auth?.token) return

    setIsFetching(true)

    const response = await accountsApi.syncUser(auth.token)

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)

      setIsFetching(false)
      return
    }

    useUserStore.getState().updateUser(response)

    revalidate('profile')
    setIsFetching(false)
  }, [auth, showErrorToast])

  return (
    <Tooltip
      content="Sincronizar com Steam"
      side="bottom"
      className="px-2 py-2 text-xs"
    >
      <div>
        <Button.Root onClick={handleUpdateProfile} profile>
          <Button.Icon
            icon={BiRefresh}
            profile
            className={twMerge('text-xl', isFetching && 'animate-spin')}
          />
        </Button.Root>
      </div>
    </Tooltip>
  )
}
