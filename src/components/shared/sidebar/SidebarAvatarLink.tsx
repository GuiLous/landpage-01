'use client'

import { twMerge } from 'tailwind-merge'

import { useUserStore } from '@/store/userStore'

import { Avatar, Link, Tooltip } from '@/components/shared'

import { SidebarRC } from './SidebarRC'

export function SidebarAvatarLink() {
  const { user } = useUserStore()

  return (
    <div
      className={twMerge(
        'flex-initial flex-col items-center gap-6 px-7',
        '3xl:px-6',
        'ultrawide:px-9'
      )}
    >
      <div
        className={twMerge(
          'flex-initial flex-col gap-4 rounded bg-gray-700/50 px-3 py-4',
          '3xl:px-2 3xl:py-3',
          'ultrawide:px-4 ultrawide:py-6 ultrawide:gap-8'
        )}
      >
        <Tooltip content="Meu perfil" asChild={false}>
          <Link
            href={`/perfil/${user?.id}`}
            className={twMerge(
              'flex w-full items-center justify-center gap-4',
              '3xl:gap-3',
              'ultrawide:gap-6'
            )}
            id="step-sidebar02"
          >
            <Avatar
              avatarUrl={user?.account?.avatar?.medium}
              alt="Imagem de perfil"
              status={user?.status}
            />

            <div
              className={twMerge(
                'flex-col items-start gap-0.5',
                'ultrawide:gap-1'
              )}
            >
              <span
                className={twMerge(
                  'text-sm font-medium text-white',
                  '3xl:text-xs',
                  'ultrawide:text-2xl'
                )}
              >
                {user?.account?.username}
              </span>

              <span
                className={twMerge(
                  'text-xs font-medium text-purple-300',
                  'ultrawide:text-xl'
                )}
              >
                Level {user?.account?.level}
              </span>
            </div>
          </Link>
        </Tooltip>

        {process.env.NEXT_PUBLIC_REACT_APP_STORE_ENABLED === 'true' && (
          <SidebarRC />
        )}
      </div>
    </div>
  )
}
