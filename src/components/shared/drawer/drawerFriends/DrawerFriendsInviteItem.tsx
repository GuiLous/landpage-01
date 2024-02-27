import { DateTime } from 'luxon'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { Status } from '@/store/userStore'

import { Avatar } from '@/components/shared'

import { DrawerFriendsInviteItemAccept } from './DrawerFriendsInviteItemAccept'
import { DrawerFriendsInviteItemRefuse } from './DrawerFriendsInviteItemRefuse'

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
  const createDate = create_date && DateTime.fromISO(create_date)

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
        <DrawerFriendsInviteItemAccept
          isFriendInvite={isFriendInvite}
          lobby_invite_id={lobby_invite_id}
          request_id={request_id}
        />

        <DrawerFriendsInviteItemRefuse
          isFriendInvite={isFriendInvite}
          lobby_invite_id={lobby_invite_id}
          request_id={request_id}
          user_id={user_id}
        />
      </div>
    </div>
  )
}
