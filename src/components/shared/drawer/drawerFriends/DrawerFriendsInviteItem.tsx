'use client'

import { DateTime } from 'luxon'
import { ComponentProps, useCallback } from 'react'
import { BsCheckCircleFill } from 'react-icons/bs'
import { RiCloseFill } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'

import { useFriendsStore } from '@/store/friendStore'
import { Status } from '@/store/userStore'

import { friendsApi, lobbyApi } from '@/modelsApi'

import { Avatar } from '@/components/shared'

import { useAuth, useShowErrorToast } from '@/hooks'

interface DrawerFriendsInviteItemProps extends ComponentProps<'div'> {
  lobby_invite_id?: string
  request_id?: number
  create_date?: string
  avatar: string
  status: Status
  username: string
  user_id?: number
  isFriendInvite?: boolean
}

export function DrawerFriendsInviteItem({
  avatar,
  lobby_invite_id,
  status,
  username,
  create_date,
  request_id,
  user_id,
  isFriendInvite = false,
  ...props
}: DrawerFriendsInviteItemProps) {
  const { removeFriendRequest } = useFriendsStore()
  const showErrorToast = useShowErrorToast()

  const auth = useAuth()

  const createDate = create_date && DateTime.fromISO(create_date)

  const handleAcceptLobbyInvite = useCallback(async () => {
    if (!auth?.token || !lobby_invite_id) return

    const response = await lobbyApi.acceptInvite(auth.token, lobby_invite_id)

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)
    }
  }, [lobby_invite_id, showErrorToast, auth?.token])

  const handleRefuseLobbyInvite = useCallback(async () => {
    if (!auth?.token || !lobby_invite_id) return

    const response = await lobbyApi.refuseInvite(auth.token, lobby_invite_id)

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)
    }
  }, [showErrorToast, lobby_invite_id, auth?.token])

  const handleAcceptFriendInvite = useCallback(async () => {
    if (!auth?.token || !request_id) return

    const response = await friendsApi.accept(auth.token, request_id)

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)
    }
  }, [auth?.token, request_id, showErrorToast])

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
      className="items-stretch bg-gradient_friends_invite py-2.5 pl-5 pr-4"
      {...props}
    >
      <div className="items-center gap-3.5 ">
        <div className="max-w-fit flex-initial">
          <Avatar avatarUrl={avatar} status={status} alt="Perfil do usuário" />
        </div>

        <div className="flex-col gap-1">
          <span
            className={twMerge(
              'text-sm font-medium text-white',
              '3xl:text-xs',
              'ultrawide:text-xl'
            )}
          >
            {username}
          </span>
          <span
            className={twMerge(
              'min-w-[95px] text-xs font-medium text-purple-300',
              '3xl:text-[0.625rem]',
              'ultrawide:text-xl ultrawide:min-w-[152px]'
            )}
          >
            {isFriendInvite
              ? createDate && createDate.toFormat('D', { locale: 'pt' })
              : 'Convidou você'}
          </span>
        </div>
      </div>

      <div className="items-center justify-end gap-2.5">
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
      </div>
    </div>
  )
}
