import { DateTime } from 'luxon'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { Avatar } from '@/components/shared'

interface DrawerNotificationsItemProps extends ComponentProps<'div'> {
  content: string
  avatar: string
  isRead: boolean
  create_date: Date | string
}

export function DrawerNotificationsItem({
  avatar,
  content,
  create_date,
  isRead,
  ...props
}: DrawerNotificationsItemProps) {
  return (
    <div
      className={twMerge(
        'items-center flex-initial gap-4 bg-gray-900 px-5 py-4',
        '3xl:py-3.5 3xl:pr-6 3xl:pl-4',
        !isRead && 'bg-gradient_notification'
      )}
      {...props}
    >
      <div className="items-center gap-4">
        <div className="flex-col gap-3">
          <div>
            <span className={twMerge('text-sm text-white', '3xl:text-xs')}>
              {content}
            </span>
          </div>

          <div>
            <span className={twMerge('text-xs text-gray-200', 'leading-none')}>
              {DateTime.fromISO(String(create_date)).toRelative()}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-fit flex-initial justify-end">
        <Avatar
          avatarUrl={avatar}
          alt="Imagem de perfil"
          size="sm"
          className="border-2 border-purple-400"
        />
      </div>
    </div>
  )
}
