import { MouseEvent, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'

import { COLOR_STATUS, STATUS_MAP } from '@/constants'

import { useAppSelector } from '@/store'
import { Status } from '@/store/slices/userSlice'

import { Avatar, MenuContext } from '@/components/shared'

interface DrawerFriendsListGroupItemProps {
  user_id: number
  status: Status
  avatar: string
  username: string
  lobby_id: number | null
  steam_url: string
  title: string
}

export function DrawerFriendsListGroupItem({
  avatar,
  status,
  steam_url,
  user_id,
  username,
  title,
}: DrawerFriendsListGroupItemProps) {
  const lobby = useAppSelector((state) => state.lobby)
  const { invites } = useAppSelector((state) => state.invites)

  const [openMenu, setOpenMenu] = useState(false)

  let humanStatus = STATUS_MAP[status]

  humanStatus += status === 'in_game' ? ' (RANKED 5X5)' : ''

  const availableStatuses = ['online', 'away', 'teaming']
  const alreadyInvitedByFriend = lobby?.invited_players_ids?.some(
    (id) => id === user_id
  )
  const alreadyInvited =
    invites.filter((invite) => invite.to_player.user_id === user_id).length >
      0 || alreadyInvitedByFriend
  const alreadyOnTeam = lobby?.players_ids?.includes(user_id)

  const isAvailable =
    !alreadyOnTeam && availableStatuses.includes(status) && !lobby?.queue

  const handleToggleMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setOpenMenu(!openMenu)
  }

  return (
    <div
      className={twMerge(
        'cursor-pointer gap-4 py-1.5 pl-0 pr-5',
        'animate-fade',
        'group',
        'hover:bg-gradient_friend'
      )}
      onContextMenu={handleToggleMenu}
      onClick={() => setOpenMenu(true)}
    >
      <div
        className={twMerge(
          'min-h-full min-w-[4px] max-w-[4px] rounded-[0_4px_4px_0] bg-gray-400 opacity-0',
          'group-hover:opacity-100'
        )}
      />

      <div className="items-center gap-3.5 px-0 py-1">
        <div
          className={twMerge(
            'flex-initial max-w-fit',
            title === 'Offline' && 'opacity-50'
          )}
        >
          <Avatar avatarUrl={avatar} status={status} alt="Perfil do usuário" />
        </div>

        <div
          className={twMerge(
            'flex-col gap-0.5',
            title === 'Offline' && 'opacity-50'
          )}
        >
          <span
            className={twMerge('text-sm font-medium text-white', '3xl:text-xs')}
          >
            {username}
          </span>
          <span
            className={twMerge(
              'text-xs',
              '3xl:text-[0.625rem]',
              COLOR_STATUS[status]
            )}
          >
            {alreadyOnTeam ? 'Em grupo' : humanStatus}
          </span>
        </div>

        <MenuContext open={openMenu} onOpenChange={setOpenMenu}>
          <MenuContext.Trigger>
            <BsThreeDots
              className={twMerge(
                'text-gray-300 opacity-0 transition-all',
                'hover:text-white',
                'group-hover:opacity-100'
              )}
              size={18}
            />
          </MenuContext.Trigger>

          <MenuContext.Content
            alreadyInvited={alreadyInvited}
            alreadyOnTeam={alreadyOnTeam}
            isAvailable={isAvailable}
            steam_url={steam_url}
            user_id={user_id}
            username={username}
          />
        </MenuContext>
      </div>
    </div>
  )
}
