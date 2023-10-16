import { FaCrown } from 'react-icons/fa'

import { Avatar, Tooltip } from '@/components/shared'

interface LineupPlayerCardHeaderProps {
  isLobbyOwner?: boolean
  avatar: string
  username: string
}

export function LineupPlayerCardHeader({
  avatar,
  isLobbyOwner = false,
  username,
}: LineupPlayerCardHeaderProps) {
  return (
    <header className="flex-initial flex-col items-center gap-[1.125rem]">
      <Avatar
        avatarUrl={avatar}
        xxl
        alt="Imagem de perfil"
        className="border-white"
      />

      <div className="items-center justify-center gap-1.5">
        {isLobbyOwner && <FaCrown className="mb-0.5 text-white 3xl:text-sm" />}

        <Tooltip content={username} side="left">
          <h3 className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold uppercase 3xl:max-w-[150px] 3xl:text-sm">
            {username}
          </h3>
        </Tooltip>
      </div>
    </header>
  )
}
