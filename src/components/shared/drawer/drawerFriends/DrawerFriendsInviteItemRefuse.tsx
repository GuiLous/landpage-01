'use client'

import { useCallback } from 'react'
import { RiCloseFill } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'

import { useFriendsStore } from '@/store/friendStore'

import { friendsApi, lobbyApi } from '@/modelsApi'

import { useAuth, useShowErrorToast } from '@/hooks'

interface DrawerFriendsInviteItemRefuseProps {
  isFriendInvite?: boolean
  lobby_invite_id?: string
  request_id?: number
  user_id?: number
}

export function DrawerFriendsInviteItemRefuse({
  isFriendInvite,
  lobby_invite_id,
  request_id,
  user_id,
}: DrawerFriendsInviteItemRefuseProps) {
  const auth = useAuth()

  const showErrorToast = useShowErrorToast()

  const { removeFriendRequest } = useFriendsStore()

  const handleRefuseLobbyInvite = useCallback(async () => {
    if (!auth?.token || !lobby_invite_id) return

    const response = await lobbyApi.refuseInvite(auth.token, lobby_invite_id)

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)
    }
  }, [showErrorToast, lobby_invite_id, auth?.token])

  const handleRefuseFriendInvite = useCallback(async () => {
    if (!auth?.token || !request_id || !user_id) return

    const response = await friendsApi.refuse(auth.token, request_id)

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)
    }

    removeFriendRequest(user_id)
  }, [auth?.token, removeFriendRequest, request_id, showErrorToast, user_id])
  return (
    <div
      className="max-w-fit flex-initial cursor-pointer items-center"
      onClick={
        isFriendInvite ? handleRefuseFriendInvite : handleRefuseLobbyInvite
      }
    >
      <RiCloseFill
        className={twMerge(
          'text-gray-300 transition-all text-[1.375rem]',
          'hover:text-white',
          'ultrawide:text-3xl'
        )}
      />
    </div>
  )
}
