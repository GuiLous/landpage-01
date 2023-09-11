import { Skeleton, Text, useMediaQuery } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { MatchesAPI } from '@api'
import {
  Container,
  MatchHistoryPagination,
  MatchHistoryStatsLink,
} from '@components'
import { StorageService } from '@services'
import { addToast } from '@slices/AppSlice'

import style from './MatchHistoryList.module.css'

export default function MatchHistoryList({ user_id, username }) {
  const [isLessThan2xl] = useMediaQuery('(max-width: 1600px)')

  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const [fetching, setIsFetching] = useState(true)
  const [matches, setMatches] = useState([])
  const [groupedMatches, setGroupedMatches] = useState([])
  const [sortedDates, setSortedDates] = useState([])
  const [page, setPage] = useState(1)
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

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const formatDate = (date) => {
    let today = DateTime.local().startOf('day')
    let formattedDate = DateTime.fromISO(date)

    if (formattedDate.hasSame(today, 'day')) {
      return 'Hoje'
    } else if (formattedDate.hasSame(today.minus({ days: 1 }), 'day')) {
      return 'Ontem'
    } else {
      return `${
        formattedDate.toFormat("dd 'de' ") +
        capitalizeFirstLetter(formattedDate.toFormat('MMMM', { locale: 'pt' }))
      }`
    }
  }

  useEffect(() => {
    const fetch = async () => {
      setIsFetching(true)
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
    <Container className={style.container} column>
      <Container align="center" justify="between" fitContent>
        <Container gap={12} style={{ alignItems: 'baseline' }}>
          <Skeleton
            isLoaded={!fetching}
            startColor="gray.700"
            endColor="gray.800"
          >
            <Text
              as="h2"
              color="white"
              fontSize={{ base: 22, md: 20, '2xl': 22 }}
              fontWeight="bold"
              textTransform="uppercase"
              lineHeight={1}
            >
              Últimas Partidas
            </Text>
          </Skeleton>
          <Skeleton
            isLoaded={!fetching}
            maxH="21px"
            startColor="gray.700"
            endColor="gray.800"
          >
            <Text
              as="span"
              color="gray.300"
              fontSize={{ base: 14, md: 12, '2xl': 14 }}
              lineHeight={1}
            >
              {matches.length === 1
                ? matches.length + ' Partida'
                : matches.length + ' Partidas'}
            </Text>
          </Skeleton>
        </Container>
      </Container>

      {fetching ? (
        <Container
          fitContent
          column
          style={{ marginTop: isLessThan2xl ? '32px' : '36px' }}
          gap={isLessThan2xl ? 20 : 30}
        >
          <Container align="center" gap={12}>
            <Skeleton
              isLoaded={!fetching}
              startColor="gray.700"
              endColor="gray.800"
              minH="20px"
              w={120}
            />

            <Skeleton
              isLoaded={!fetching}
              startColor="gray.700"
              endColor="gray.800"
              minH="24px"
              w="24px"
            />
          </Container>
          <Container column gap={8}>
            {Array.from(Array(5)).map((_, index) => (
              <Skeleton
                key={index}
                w="full"
                minH="82px"
                startColor="gray.700"
                endColor="gray.800"
              />
            ))}
          </Container>
        </Container>
      ) : (
        sortedDates.map((date) => (
          <Container
            key={date}
            fitContent
            column
            style={{ marginTop: isLessThan2xl ? '32px' : '36px' }}
            gap={isLessThan2xl ? 20 : 30}
          >
            <Container align="center" gap={12}>
              <Text
                fontSize={{ base: 18, md: 16, '2xl': 18 }}
                color="white"
                lineHeight={1}
              >
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
                  userId={Number(user_id)}
                  match={match}
                />
              ))}
            </Container>
          </Container>
        ))
      )}

      {sortedDates.length === 0 && !fetching ? (
        <Container
          align="center"
          justify="center"
          style={{ marginTop: isLessThan2xl ? '20px' : '24px' }}
          className={style.empty}
        >
          <Text fontSize={{ base: 16, md: 14, '2xl': 16 }} color="gray.300">
            {`Ops, ${
              user.id === Number(user_id) ? 'você' : username
            } ainda não tem partidas.`}
          </Text>
        </Container>
      ) : (
        totalPages > 1 && (
          <Container
            align="start"
            justify="center"
            style={{ marginTop: isLessThan2xl ? '20px' : '24px' }}
          >
            <MatchHistoryPagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={setPage}
            />
          </Container>
        )
      )}
    </Container>
  )
}
