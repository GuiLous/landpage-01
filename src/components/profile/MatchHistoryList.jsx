import { Text } from '@chakra-ui/react'
import { DateTime } from 'luxon'

import {
  Container,
  MatchHistoryPagination,
  MatchHistoryStatsLink,
} from '@components'

import { useState } from 'react'
import style from './MatchHistoryList.module.css'

export default function MatchHistoryList({ matches, user, total_matches }) {
  const [page, setPage] = useState(1)

  const groupByDay = (matches) => {
    return matches.reduce((groups, match) => {
      let matchDate = DateTime.fromISO(match.end_date).toISODate()
      if (!groups[matchDate]) {
        groups[matchDate] = []
      }
      groups[matchDate].push(match)
      return groups
    }, {})
  }

  const formatDate = (date) => {
    let today = DateTime.local().startOf('day')
    let formattedDate = DateTime.fromISO(date)

    if (formattedDate.hasSame(today, 'day')) {
      return 'Hoje'
    } else if (formattedDate.hasSame(today.minus({ days: 1 }), 'day')) {
      return 'Ontem'
    } else {
      return `${formattedDate.toFormat('dd')} de ${formattedDate.toFormat(
        'MMMM'
      )}`
    }
  }

  const groupedMatches = groupByDay(matches)
  let sortedDates = Object.keys(groupedMatches).sort(
    (a, b) => DateTime.fromISO(b).valueOf() - DateTime.fromISO(a).valueOf()
  )

  return (
    <Container className={style.container} column>
      <Container align="center" justify="between">
        <Container gap={12} style={{ alignItems: 'baseline' }}>
          <Text
            as="h2"
            color="white"
            fontSize={22}
            fontWeight="bold"
            textTransform="uppercase"
            lineHeight={1}
          >
            Últimas Partidas
          </Text>
          <Text as="span" color="gray.700" fontSize={14} lineHeight={1}>
            {total_matches} Partidas
          </Text>
        </Container>
      </Container>

      {sortedDates.map((date) => (
        <Container key={date} column style={{ marginTop: '36px' }} gap={30}>
          <Container align="center" gap={12}>
            <Text fontSize={18} color="white" lineHeight={1}>
              {formatDate(date)}
            </Text>
            <Container className={style.matchesNumber} fitContent>
              <Text lineHeight={1} color="gray.700" fontSize={12}>
                {groupedMatches[date].length}
              </Text>
            </Container>
          </Container>

          <Container column gap={8}>
            {groupedMatches[date].map((match) => (
              <MatchHistoryStatsLink key={match.id} user={user} match={match} />
            ))}
          </Container>
        </Container>
      ))}

      {sortedDates.length === 0 ? (
        <Container
          align="center"
          justify="center"
          style={{ marginTop: '24px' }}
        >
          <Text fontSize={16} color="gray.700">
            Ops, você ainda não tem partidas.
          </Text>
        </Container>
      ) : (
        <Container
          align="center"
          justify="center"
          style={{ marginTop: '24px' }}
        >
          <MatchHistoryPagination
            totalCountOfRegisters={total_matches}
            currentPage={page}
            onPageChange={setPage}
          />
        </Container>
      )}
    </Container>
  )
}
