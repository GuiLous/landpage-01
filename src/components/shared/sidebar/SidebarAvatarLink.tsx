'use client'

import * as Avatar from '@radix-ui/react-avatar'

import { useAppSelector } from '@/store'

import { Badge } from '../badge/Badge'
import { Link } from '../link/Link'
import { Tooltip } from '../tooltip/Tooltip'

export function SidebarAvatarLink() {
  const { user } = useAppSelector((state) => state.user)

  return (
    <div className="flex-initial flex-col items-center gap-6 px-7 3xl:px-6">
      <div className="flex-initial flex-col gap-4 rounded-[4px] bg-gray-700/50 px-3 py-4 3xl:px-2 3xl:py-3">
        <Tooltip content="Meu perfil">
          <div>
            <Link
              href={`/perfil/${user?.id}`}
              className="flex w-full items-center justify-center gap-4 3xl:gap-3"
            >
              <Avatar.Root className="relative inline-flex h-11 w-11 select-none items-center justify-center rounded-full 3xl:h-[38px] 3xl:w-[38px]">
                <Avatar.Image
                  src={user?.account?.avatar?.medium}
                  alt="Imagem de perfil"
                  className="h-full w-full rounded-[inherit] object-cover"
                />

                <Badge
                  online={user?.status === 'online'}
                  offline={user?.status === 'offline'}
                  queued={user?.status === 'queued'}
                  in_game={user?.status === 'in_game'}
                  teaming={user?.status === 'teaming'}
                />
              </Avatar.Root>

              <div className="flex-col gap-0.5">
                <span className="text-sm font-medium text-white 3xl:text-xs">
                  {user?.account?.username}
                </span>

                <span className="text-xs font-medium text-purple-300">
                  Level {user?.account?.level}
                </span>
              </div>
            </Link>
          </div>
        </Tooltip>
      </div>
    </div>
  )
}
