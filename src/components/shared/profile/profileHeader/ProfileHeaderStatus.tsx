import { twMerge } from 'tailwind-merge'

import { humanizeStatus } from '@/utils'

import { Status } from '@/store/userStore'

import { Badge } from '@/components/shared'

interface ProfileHeaderStatusProps {
  username: string
  status: Status
}

export function ProfileHeaderStatus({
  status,
  username,
}: ProfileHeaderStatusProps) {
  let humanStatus = humanizeStatus(status)

  humanStatus += status === 'in_game' ? ' (RANKED 5X5)' : ''

  return (
    <div className="flex-col">
      <div className="flex-initial items-center gap-3.5">
        <span
          className={twMerge(
            'font-bold text-white text-xl',
            '3xl:text-lg',
            'ultrawide:text-4xl'
          )}
        >
          {username}
        </span>

        <div className={twMerge('items-center gap-2', 'ultrawide:gap-4')}>
          <Badge
            variant={status}
            className={twMerge(
              'relative h-[10px] w-[10px] flex-initial border-0',
              'ultrawide:h-4 ultrawide:w-4 ultrawide:border-0'
            )}
          />
          <span
            className={twMerge(
              'text-white text-sm',
              'leading-none',
              '3xl:text-xs',
              'ultrawide:text-2xl ultrawide:leading-none'
            )}
          >
            {humanStatus}
          </span>
        </div>
      </div>
    </div>
  )
}
