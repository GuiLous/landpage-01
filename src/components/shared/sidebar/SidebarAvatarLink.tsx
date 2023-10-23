'use client'

import { twMerge } from 'tailwind-merge'

import { useAppSelector } from '@/store'

import { Avatar, Link, Tooltip } from '@/components/shared'

export function SidebarAvatarLink() {
  const { user } = useAppSelector((state) => state.user)

  return (
    <div
      className={twMerge(
        'flex-initial flex-col items-center gap-6 px-7',
        '3xl:px-6'
      )}
    >
      <div
        className={twMerge(
          'flex-initial flex-col gap-4 rounded bg-gray-700/50 px-3 py-4',
          '3xl:px-2 3xl:py-3'
        )}
      >
        <Tooltip content="Meu perfil" asChild={false}>
          <Link
            href={`/perfil/${user?.id}`}
            className={twMerge(
              'flex w-full items-center justify-center gap-4',
              '3xl:gap-3'
            )}
          >
            <Avatar
              avatarUrl={user?.account?.avatar?.medium}
              alt="Imagem de perfil"
              status={user?.status}
            />

            <div className="flex-col items-start gap-0.5">
              <span
                className={twMerge(
                  'text-sm font-medium text-white',
                  '3xl:text-xs'
                )}
              >
                {user?.account?.username}
              </span>

              <span className="text-xs font-medium text-purple-300">
                Level {user?.account?.level}
              </span>
            </div>
          </Link>
        </Tooltip>
      </div>
    </div>
  )
}
