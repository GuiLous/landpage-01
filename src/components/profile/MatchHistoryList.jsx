import { Skeleton, Text } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { MatchesAPI } from '@api'
import {
  Container,
  MatchHistoryPagination,
  MatchHistoryStatsLink,
} from '@components'
import { StorageService } from '@services'
import { addToast } from '@slices/AppSlice'

import style from './MatchHistoryList.module.css'

export default function MatchHistoryList({ user_id }) {
  const dispatch = useDispatch()

  const [fetching, setIsFetching] = useState(true)
  const [matches, setMatches] = useState([])
  const [groupedMatches, setGroupedMatches] = useState([])
  const [sortedDates, setSortedDates] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

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

  useEffect(() => {
    const fetch = async () => {
      const userToken = StorageService.get('token')

      const response = await MatchesAPI.list(userToken, user_id, page)
      if (response.errorMsg) {
        dispatch(
          addToast({
            content: response.errorMsg,
            variant: 'error',
          })
        )
        return
      }

      setTotalPages(response.total_pages)
      setPageSize(response.page_size)
      setMatches(response.results)
      setIsFetching(false)
    }

    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    if (matches) {
      const groupedMatches = groupByDay(matches)
      setGroupedMatches(groupedMatches)

      let sortedDates = Object.keys(groupedMatches).sort(
        (a, b) => DateTime.fromISO(b).valueOf() - DateTime.fromISO(a).valueOf()
      )

      setSortedDates(sortedDates)
    }
  }, [matches])

  return (
    <Skeleton
      isLoaded={!fetching}
      flex="1"
      borderRadius="8px"
      startColor="gray.700"
      endColor="500"
    >
      <Container className={style.container} column>
        <Container align="center" justify="between" fitContent>
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
            <Text as="span" color="gray.300" fontSize={14} lineHeight={1}>
              {matches.length === 1
                ? matches.length + ' Partida'
                : matches.length + ' Partidas'}
            </Text>
          </Container>
        </Container>

        {sortedDates.map((date) => (
          <Container
            key={date}
            fitContent
            column
            style={{ marginTop: '36px' }}
            gap={30}
          >
            <Container align="center" gap={12}>
              <Text fontSize={18} color="white" lineHeight={1}>
                {formatDate(date)}
              </Text>
              <Container className={style.matchesNumber} fitContent>
                <Text lineHeight={1} color="gray.300" fontSize={12}>
                  {groupedMatches[date].length}
                </Text>
              </Container>
            </Container>

            <Container column gap={8}>
              {groupedMatches[date].map((match) => (
                <MatchHistoryStatsLink
                  key={match.id}
                  user_id={Number(user_id)}
                  match={match}
                />
              ))}
            </Container>
          </Container>
        ))}

        {sortedDates.length === 0 ? (
          <Container
            align="center"
            justify="center"
            style={{ marginTop: '24px' }}
            className={style.empty}
          >
            <Text fontSize={16} color="gray.300">
              Ops, você ainda não tem partidas.
            </Text>
          </Container>
        ) : (
          totalPages > 0 && (
            <Container
              align="start"
              justify="center"
              style={{ marginTop: '24px' }}
            >
              <MatchHistoryPagination
                totalCountOfRegisters={matches.length}
                currentPage={page}
                onPageChange={setPage}
                registerPerPage={pageSize}
              />
            </Container>
          )
        )}
      </Container>
    </Skeleton>
  )
}
