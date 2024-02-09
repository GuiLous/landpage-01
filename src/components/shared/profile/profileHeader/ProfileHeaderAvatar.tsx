'use client'

import { useCallback, useState } from 'react'
import { BiRefresh } from 'react-icons/bi'
import { twMerge } from 'tailwind-merge'

import { revalidate } from '@/utils'

import { useUserStore } from '@/store/userStore'

import { accountsApi } from '@/modelsApi'

import { Avatar, CustomIcon, Tooltip } from '@/components/shared'

import { useAudio, useAuth, useShowErrorToast } from '@/hooks'

const buttonHoverUrl = '/assets/audios/button_hover.mp3'
const buttonClickUrl = '/assets/audios/click.mp3'

interface ProfileHeaderAvatarProps {
  avatarUrl: string
  isUserLogged: boolean
}

export function ProfileHeaderAvatar({
  avatarUrl,
  isUserLogged,
}: ProfileHeaderAvatarProps) {
  const { updateUser } = useUserStore()

  const playSoundHover = useAudio(buttonHoverUrl)
  const playSoundClick = useAudio(buttonClickUrl)

  const showErrorToast = useShowErrorToast()

  const auth = useAuth()

  const [isFetching, setIsFetching] = useState(false)

  const handleUpdateProfile = useCallback(async () => {
    if (!auth?.token) return

    playSoundClick()

    setIsFetching(true)

    const response = await accountsApi.syncUser(auth.token)

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)

      setIsFetching(false)
      return
    }

    updateUser(response)

    revalidate('profile')
    setIsFetching(false)
  }, [auth?.token, showErrorToast, updateUser, playSoundClick])

  return (
    <div className="relative max-w-fit flex-initial">
      <Avatar
        avatarUrl={avatarUrl}
        alt="Foto do usuário"
        size="xxl"
        className="border-white"
      />

      {isUserLogged && (
        <Tooltip
          content="Sincronizar com Steam"
          side="bottom"
          className="px-2 py-2 text-xs"
        >
          <div
            className={twMerge(
              'absolute bottom-0 right-1 h-8 w-auto min-w-8 max-w-fit flex-initial cursor-pointer items-center justify-center rounded-full bg-white transition-colors',
              'hover:bg-gray-100',
              'ultrawide:min-h-14 ultrawide:min-w-14',
              isFetching && 'bg-gray-100 cursor-not-allowed'
            )}
            onClick={handleUpdateProfile}
            onMouseEnter={playSoundHover}
            id="step-header01"
          >
            <CustomIcon
              icon={BiRefresh}
              className={twMerge(
                'text-xl text-gray-1100',
                'ultrawide:text-4xl',
                isFetching && 'animate-spin'
              )}
            />
          </div>
        </Tooltip>
      )}
    </div>
  )
}
