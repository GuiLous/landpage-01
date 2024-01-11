import { twMerge } from 'tailwind-merge'

import { formatDateToPtFormat } from '@/utils'

interface ProfileMatchHistoryListDateProps {
  date: string
  groupedMatches: any
}

export function ProfileMatchHistoryListDate({
  date,
  groupedMatches,
}: ProfileMatchHistoryListDateProps) {
  return (
    <div className="items-center gap-3">
      <span
        className={twMerge(
          'text-lg text-white',
          'leading-none',
          '3xl:text-base'
        )}
      >
        {formatDateToPtFormat(date)}
      </span>

      <div
        className={twMerge(
          'h-6 min-w-[24px] max-w-fit flex-initial items-center justify-center rounded bg-gray-800 px-2.5 py-2',
          '3xl:h-[22px] 3xl:min-w-[22px] 3xl:py-1.5 3xl:px-2'
        )}
      >
        <span className={twMerge('text-xs text-gray-300', 'leading-none')}>
          {groupedMatches[date].length}
        </span>
      </div>
    </div>
  )
}
