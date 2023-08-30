import {
  Icon,
  Image,
  Link,
  Text,
  Tooltip,
  useMediaQuery,
} from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { Link as RouterLink } from 'react-router-dom'

import { ArrowRightSimpleIcon, Container } from '@components'

import style from './MatchHistoryStatsLink.module.css'

const statsFields = [
  {
    field: 'kda',
    title: 'kda',
    label: 'Abates e assistências por morte',
    minWidth: '101',
  },
  {
    field: 'kdr',
    title: 'kdr',
    label: 'Abates por morte',
    minWidth: '30',
  },
  {
    field: 'head_accuracy',
    title: 'hs%',
    label: 'Porcentagem de tiros na cabeça',
    minWidth: '35',
  },
  {
    field: 'adr',
    title: 'adr',
    label: 'Dano médio por round',
    minWidth: '30',
  },
  {
    field: 'firstkills',
    title: 'fk',
    label: 'Primeiros abates',
    minWidth: '26',
  },
]

const TYPE_MAP = {
  competitive: 'Ranqueada',
  custom: 'Personalizada',
}

export default function MatchHistoryStatsLink({
  match,
  isLink = true,
  username,
}) {
  const [isLessThan2xl] = useMediaQuery('(max-width: 1600px)')

  const startDate = DateTime.fromISO(match.start_date)
  const endDate = match.end_date && DateTime.fromISO(match.end_date)
  const elapsedTime = Math.floor(
    endDate
      ? endDate.diff(startDate, 'seconds').seconds
      : DateTime.now().diff(startDate, 'seconds').seconds
  )

  function formatSeconds(seconds) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    if (hours === 0)
      return `${minutes.toString().padStart(2, '0')}m${remainingSeconds
        .toString()
        .padStart(2, '0')}s`

    return `${hours.toString().padStart(2, '0')}h${minutes
      .toString()
      .padStart(2, '0')}m${remainingSeconds.toString().padStart(2, '0')}s`
  }

  const renderStats = () => {
    return statsFields.map((stats, index) => (
      <Container
        key={index}
        align="center"
        column
        gap={isLessThan2xl ? 9 : 11}
        style={{ minWidth: `${stats.minWidth}px` }}
      >
        <Tooltip label={stats.label} aria-label={`${stats.field} tooltip`}>
          <Text
            as="span"
            color="gray.300"
            fontWeight="medium"
            fontSize={12}
            align="flex-start"
            textTransform="uppercase"
            lineHeight={1}
          >
            {stats.title}
          </Text>
        </Tooltip>
        <Text
          as="span"
          fontSize={{ base: 16, md: 14, '2xl': 16 }}
          fontWeight="semiBold"
          color="white"
          align="flex-start"
          lineHeight={1}
          data-testid={stats.field}
        >
          {match.status === 'running' && '-'}
          {match.status !== 'running' && match.stats[stats.field]}
          {match.status !== 'running' && stats.title.includes('%') && '%'}
        </Text>
      </Container>
    ))
  }

  return (
    <Link
      as={isLink ? RouterLink : 'div'}
      to={isLink ? `/partidas/${username}/${match.id}` : null}
      align="center"
      cursor={isLink ? 'pointer' : 'initial'}
      data-testid="link"
      className={[
        style.container,
        match.status !== 'running' && (match.won ? style.won : style.defeated),
        !isLink && style.disableHover,
      ].join(' ')}
    >
      <Container className={style.border} fitContent></Container>

      <Container style={{ alignItems: 'initial' }} gap={16}>
        <Image
          src={match.map_image}
          objectFit="cover"
          borderRadius="4px"
          w="54px"
          h="54px"
          alt="map name"
          className={style.mapImage}
        />

        <Container column justify="between" gap={8}>
          <Text
            as="span"
            fontSize={16}
            fontWeight="medium"
            lineHeight={1}
            color="white"
          >
            {match.map_name || 'Nome do mapa'}
          </Text>

          <Container column fitContent gap={5}>
            <Text lineHeight={1} color="gray.300" fontSize={12}>
              {TYPE_MAP[match.game_type]}
            </Text>

            <Text lineHeight={1} color="gray.300" fontSize={12}>
              {!isLink && `${startDate.toFormat('dd/MM/yyyy')} - `}
              {formatSeconds(elapsedTime)}
            </Text>
          </Container>
        </Container>
      </Container>

      <Container>
        <Container
          gap={14}
          column
          align="center"
          style={{ maxWidth: 'fit-content', minWidth: '70px' }}
        >
          <Text
            as="span"
            fontSize={12}
            fontWeight="medium"
            textAlign="center"
            color={
              match.status === 'running'
                ? 'gray.300'
                : match.won
                ? 'green.600'
                : 'red.500'
            }
            lineHeight={1}
          >
            {match.status === 'running' && 'EM PARTIDA'}
            {match.status !== 'running' && match.won && 'VITÓRIA'}
            {match.status !== 'running' && !match.won && 'DERROTA'}
          </Text>

          <Text
            as="span"
            fontSize={20}
            fontWeight="semiBold"
            textAlign="center"
            color="white"
            data-testid="score"
            lineHeight={1}
          >
            {match.score}
          </Text>
        </Container>
      </Container>

      <Container align="center" justify="center" gap={isLessThan2xl ? 30 : 40}>
        {renderStats()}

        {isLink && (
          <Icon
            as={ArrowRightSimpleIcon}
            fill="white"
            h="12px"
            w="7px"
            data-testid="arrow"
          />
        )}
      </Container>
    </Link>
  )
}
