import { useCallback } from 'react'
import { BsCheckCircleFill } from 'react-icons/bs'
import { RiCloseFill } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'

import { storageService } from '@/services'

import { Status } from '@/store/slices/userSlice'

import { lobbyApi } from '@/api'

import { Avatar } from '@/components/shared'

import { useShowErrorToast } from '@/hooks'

interface DrawerFriendsInviteItemProps {
  invite_id: string
  avatar: string
  status: Status
  username: string
}

export function DrawerFriendsInviteItem({
  avatar,
  invite_id,
  status,
  username,
}: DrawerFriendsInviteItemProps) {
  const showErrorToast = useShowErrorToast()

  const userToken = storageService.get('token')

  const handleAccept = useCallback(async () => {
    if (!userToken) return

    const response = await lobbyApi.acceptInvite(userToken, invite_id)

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)
    }
  }, [invite_id, showErrorToast, userToken])

  const handleRefuse = useCallback(async () => {
    if (!userToken) return

    const response = await lobbyApi.refuseInvite(userToken, invite_id)

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)
    }
  }, [showErrorToast, invite_id, userToken])

  return (
    <div className="items-stretch bg-gradient_friends_invite py-2.5 pl-5 pr-4">
      <div className="items-center gap-3.5 ">
        <div className="max-w-fit flex-initial">
          <Avatar avatarUrl={avatar} status={status} alt="Perfil do usuário" />
        </div>

        <div className="flex-col gap-1">
          <span
            className={twMerge('text-sm font-medium text-white', '3xl:text-xs')}
          >
            {username}
          </span>
          <span
            className={twMerge(
              'min-w-[95px] text-xs font-medium text-purple-300',
              '3xl:text-[0.625rem]'
            )}
          >
            Convidou você
          </span>
        </div>
      </div>

      <div className="items-center justify-end gap-2.5">
        <div
          className="max-w-fit flex-initial cursor-pointer items-center"
          onClick={handleAccept}
        >
          <BsCheckCircleFill
            className={twMerge(
              'text-green-600 transition-al',
              'hover:scale-110 hover:text-green-500'
            )}
            size={20}
          />
        </div>

        <div
          className="max-w-fit flex-initial cursor-pointer items-center"
          onClick={handleRefuse}
        >
          <RiCloseFill
            className={twMerge(
              'text-gray-300 transition-all',
              'hover:text-white'
            )}
            size={22}
          />
        </div>
      </div>
    </div>
  )
}
