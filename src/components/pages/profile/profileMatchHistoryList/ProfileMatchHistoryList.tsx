import { DateTime } from 'luxon'
import { twMerge } from 'tailwind-merge'

import { getAuthServer, groupMatchesByDay } from '@/utils'

import { getMatchesHistory, getUserProfile } from '@/functions'

import { Pagination } from '@/components/shared'

import { ProfileMatchHistoryListByDate } from './ProfileMatchHistoryListByDate'
import { ProfileMatchHistoryListHeader } from './ProfileMatchHistoryListHeader'

interface ProfileMatchHistoryListProps {
  userId: number
  page?: number
}

export async function ProfileMatchHistoryList({
  userId,
  page = 1,
}: ProfileMatchHistoryListProps) {
  const auth = await getAuthServer()

  const matchHistory = await getMatchesHistory(userId, page)
  const profile = await getUserProfile(userId)
  const { username } = profile

  const matches = matchHistory.results

  const groupedMatches = groupMatchesByDay(matches)

  const sortedDates = Object.keys(groupedMatches).sort(
    (a, b) => DateTime.fromISO(b).valueOf() - DateTime.fromISO(a).valueOf()
  )

  return (
    <section
      className={twMerge(
        'flex-col rounded bg-gray-1000 p-6',
        '3xl:min-h-[852px] 3xl:p-5'
      )}
    >
      <ProfileMatchHistoryListHeader matches={matches} />

      <ProfileMatchHistoryListByDate
        groupedMatches={groupedMatches}
        sortedDates={sortedDates}
        userId={userId}
      />

      {sortedDates.length === 0 ? (
        <div
          className={twMerge('items-center justify-center mt-6', '3xl:mt-5')}
        >
          <p
            className={twMerge(
              'text-gray-300',
              '3xl:text-sm',
              'ultrawide:text-2xl'
            )}
          >
            {`Ops, ${
              auth.id === Number(userId) ? 'você' : username
            } ainda não tem partidas.`}
          </p>
        </div>
      ) : (
        matchHistory.total_pages > 1 && (
          <div className={twMerge('items-end justify-center mt-6', '3xl:mt-5')}>
            <Pagination
              totalPages={matchHistory.total_pages}
              currentPage={matchHistory.current_page}
            />
          </div>
        )
      )}
    </section>
  )
}
