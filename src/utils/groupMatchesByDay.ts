import { DateTime } from 'luxon'

import { MatchProfileType } from '@/functions'

export const groupMatchesByDay = (matches: MatchProfileType[]) => {
  return matches.reduce((groups, match) => {
    if (!match?.end_date) return groups

    const matchDate = DateTime.fromISO(match.end_date).toISODate()
    if (matchDate) {
      if (!groups[matchDate]) {
        groups[matchDate] = []
      }

      groups[matchDate].push(match)
    }
    return groups
  }, {} as any)
}
