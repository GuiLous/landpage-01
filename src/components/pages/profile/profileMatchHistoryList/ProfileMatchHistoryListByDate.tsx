import { twMerge } from 'tailwind-merge'

import { MatchProfileType } from '@/functions'

import { ProfileMatchStatsLink } from '@/components/shared'

import { ProfileMatchHistoryListDate } from './ProfileMatchHistoryListDate'

interface ProfileMatchHistoryListByDateProps {
  sortedDates: string[]
  groupedMatches: any
  userId: number
}

export function ProfileMatchHistoryListByDate({
  sortedDates,
  groupedMatches,
  userId,
}: ProfileMatchHistoryListByDateProps) {
  return sortedDates.map((date) => (
    <section
      key={date}
      className={twMerge(
        'flex-initial flex-col gap-8 mt-9',
        '3xl:gap-5 3xl:mt-8'
      )}
    >
      <ProfileMatchHistoryListDate
        date={date}
        groupedMatches={groupedMatches}
      />

      <div className="flex-col gap-2">
        {groupedMatches[date].map((match: MatchProfileType) => (
          <ProfileMatchStatsLink key={date} userId={userId} match={match} />
        ))}
      </div>
    </section>
  ))
}
