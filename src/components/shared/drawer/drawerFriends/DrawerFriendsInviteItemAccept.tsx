'use client'

import { useCallback } from 'react'
import { BsCheckCircleFill } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'

import { friendsApi, lobbyApi } from '@/modelsApi'

import { useAuth, useShowErrorToast } from '@/hooks'

interface DrawerFriendsInviteItemAcceptProps {
  isFriendInvite?: boolean
  lobby_invite_id?: string
  request_id?: number
}

export function DrawerFriendsInviteItemAccept({
  isFriendInvite,
  lobby_invite_id,
  request_id,
}: DrawerFriendsInviteItemAcceptProps) {
  const auth = useAuth()

  const showErrorToast = useShowErrorToast()

  const handleAcceptLobbyInvite = useCallback(async () => {
    if (!auth?.token || !lobby_invite_id) return

    const response = await lobbyApi.acceptInvite(auth.token, lobby_invite_id)

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)
    }
  }, [lobby_invite_id, showErrorToast, auth?.token])

  const handleAcceptFriendInvite = useCallback(async () => {
    if (!auth?.token || !request_id) return

    const response = await friendsApi.accept(auth.token, request_id)

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)
    }
  }, [auth?.token, request_id, showErrorToast])

  return (
    <div
      className="max-w-fit flex-initial cursor-pointer items-center"
      onClick={
        isFriendInvite ? handleAcceptFriendInvite : handleAcceptLobbyInvite
      }
    >
      <BsCheckCircleFill
        className={twMerge(
          'text-green-600 transition-all text-xl',
          'hover:scale-110 hover:text-green-500',
          'ultrawide:text-3xl'
        )}
      />
    </div>
  )
}
