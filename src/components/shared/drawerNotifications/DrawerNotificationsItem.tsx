import * as Avatar from '@radix-ui/react-avatar'
import { DateTime } from 'luxon'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

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
        'items-center flex-initial gap-4 bg-gray-900 px-5 py-4 3xl:py-3.5 3xl:pr-6 3xl:pl-4',
        !isRead &&
          'bg-[linear-gradient(90deg,_#6847ff80_0%,_#33333300_100%,_#1e1e1e)]'
      )}
      {...props}
    >
      <div className="items-center gap-4">
        <div className="flex-col gap-3">
          <div>
            <span className="text-sm text-white 3xl:text-xs">{content}</span>
          </div>

          <div>
            <span className="text-xs leading-none text-gray-200">
              {DateTime.fromISO(String(create_date)).toRelative()}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-fit flex-initial justify-end">
        <Avatar.Root className="relative inline-flex h-8 w-8 select-none items-center justify-center rounded-full border-2 border-purple-400">
          <Avatar.Image
            src={avatar}
            alt="Imagem de perfil"
            className="h-full w-full rounded-[inherit] object-cover"
          />
        </Avatar.Root>
      </div>
    </div>
  )
}
