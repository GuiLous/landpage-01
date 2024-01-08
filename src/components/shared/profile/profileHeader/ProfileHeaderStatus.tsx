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
          className={twMerge('font-bold text-white text-xl', '3xl:text-lg')}
        >
          {username}
        </span>

        <div className="items-center gap-2">
          <Badge
            variant={status}
            className="relative h-[10px] w-[10px] flex-initial border-0"
          />
          <span
            className={twMerge(
              'leading-none text-white text-sm',
              '3xl:text-xs'
            )}
          >
            {humanStatus}
          </span>
        </div>
      </div>
    </div>
  )
}
