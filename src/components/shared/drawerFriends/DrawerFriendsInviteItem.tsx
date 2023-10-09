import { BsCheckCircleFill } from 'react-icons/bs'
import { RiCloseFill } from 'react-icons/ri'

import { storageService } from '@/services'

import { useAppDispatch } from '@/store'
import { addToast } from '@/store/slices/appSlice'
import { Status } from '@/store/slices/userSlice'

import { lobbyApi } from '@/api'

import { Avatar } from '../avatar/Avatar'

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
  const dispatch = useAppDispatch()
  const userToken = storageService.get('token')

  const handleAccept = async () => {
    if (!userToken) return

    const response = await lobbyApi.acceptInvite(userToken, invite_id)

    if (response.errorMsg) {
      dispatch(
        addToast({
          content: response.errorMsg,
          variant: 'error',
        })
      )
    }
  }

  const handleRefuse = async () => {
    if (!userToken) return

    const response = await lobbyApi.refuseInvite(userToken, invite_id)

    if (response.errorMsg) {
      dispatch(
        addToast({
          content: response.errorMsg,
          variant: 'error',
        })
      )
    }
  }

  return (
    <div className="items-stretch bg-[linear-gradient(90deg,_#6847ff80_0%,_#33333300_100%,_#1e1e1e)] py-2.5 pl-5 pr-4">
      <div className="items-center gap-3.5 ">
        <div className="max-w-fit flex-initial">
          <Avatar
            avatarUrl={avatar}
            status={status}
            md
            alt="Perfil do usuário"
          />
        </div>

        <div className="flex-col gap-1">
          <span className="text-sm font-medium text-white 3xl:text-xs">
            {username}
          </span>
          <span className="min-w-[95px] text-xs font-medium text-purple-300 3xl:text-[0.625rem]">
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
            className="text-green-600 transition-all hover:scale-110 hover:text-green-500"
            size={20}
          />
        </div>

        <div
          className="max-w-fit flex-initial cursor-pointer items-center"
          onClick={handleRefuse}
        >
          <RiCloseFill
            className="text-gray-300 transition-all hover:text-white"
            size={22}
          />
        </div>
      </div>
    </div>
  )
}
