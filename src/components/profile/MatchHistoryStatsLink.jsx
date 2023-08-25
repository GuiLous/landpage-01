import { Icon, Link, Text, Tooltip, useMediaQuery } from '@chakra-ui/react'
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

export default function MatchHistoryStatsLink({ match }) {
  const [isLessThan2xl] = useMediaQuery('(max-width: 1600px)')

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
          {match.stats[stats.field]}
          {stats.title.includes('%') && '%'}
        </Text>
      </Container>
    ))
  }

  return (
    <Link
      as={RouterLink}
      to={`/partidas/${match.id}`}
      align="center"
      data-testid="link"
      className={[style.container, match.won ? style.won : style.defeated].join(
        ' '
      )}
    >
      <Container className={style.border} fitContent></Container>

      <Container column gap={isLessThan2xl ? 6 : 8}>
        <Text
          as="span"
          fontSize={{ base: 20, md: 18, '2xl': 20 }}
          fontWeight="medium"
          lineHeight={1}
          letterSpacing="0.5pt"
          color="white"
        >
          {match.map_name || 'Nome do mapa'}
        </Text>
        <Text
          lineHeight={1}
          color="gray.300"
          fontSize={{ base: 14, md: 12, '2xl': 14 }}
          fontWeight="medium"
        >
          {DateTime.fromISO(match.end_date).toRelative()}
        </Text>
      </Container>

      <Container>
        <Text
          as="span"
          fontSize={{ base: 24, md: 22, '2xl': 24 }}
          fontWeight="semiBold"
          textAlign="center"
          color="white"
          data-testid="score"
        >
          {match.score}
        </Text>
      </Container>

      <Container align="center" justify="center" gap={isLessThan2xl ? 30 : 40}>
        {renderStats()}

        <Icon
          as={ArrowRightSimpleIcon}
          fill="white"
          h="12px"
          w="7px"
          data-testid="arrow"
        />
      </Container>
    </Link>
  )
}
