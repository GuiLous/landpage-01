import { twMerge } from 'tailwind-merge'

import { MatchProfileType } from '@/functions'

import { ProfileMatchHistoryListDate } from './ProfileMatchHistoryListDate'

interface ProfileMatchHistoryListByDateProps {
  sortedDates: string[]
  groupedMatches: any
}

export function ProfileMatchHistoryListByDate({
  sortedDates,
  groupedMatches,
}: ProfileMatchHistoryListByDateProps) {
  return sortedDates.map((date) => (
    <section
      key={date}
      className={twMerge(
        'flex-initial max-w-fit flex-col gap-8 mt-9',
        '3xl:gap-5 3xl:mt-8'
      )}
    >
      <ProfileMatchHistoryListDate
        date={date}
        groupedMatches={groupedMatches}
      />

      <div className="flex-col gap-2">
        {groupedMatches[date].map((match: MatchProfileType) => (
          <div key={match.id}>{match.map_name}</div>
        ))}
      </div>
    </section>
  ))
}
