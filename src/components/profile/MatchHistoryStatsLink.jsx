import { Icon, Link, Text, Tooltip } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { Link as RouterLink } from 'react-router-dom'

import { ArrowRightSimpleIcon, Container } from '@components'

import style from './MatchHistoryStatsLink.module.css'

const statsFields = [
  {
    field: 'kda',
    label: 'Abates e assistências por morte',
  },
  {
    field: 'kdr',
    label: 'Abates por morte',
  },
  {
    field: 'hs%',
    label: 'Porcentagem de tiros na cabeça',
  },
  {
    field: 'adr',
    label: 'Dano médio por round',
  },
  {
    field: 'fk',
    label: 'Primeiros abates',
  },
]

export default function MatchHistoryStatsLink({ user, match }) {
  const winner_team_id = match.winner_id
  const winner_team = match.teams.find((team) => team.id === winner_team_id)
  const defeated_team = match.teams.find((team) => team.id !== winner_team_id)
  const won = winner_team.players.find((player) => player.user_id === user.id)

  const player = won
    ? won
    : defeated_team.players.find((player) => player.user_id === user.id)

  const renderStats = () => {
    const kda = `${player.stats.kills}/${player.stats.deaths}/${player.stats.assists}`

    // calculate Kill-Death Ratio number
    let kdr = 0
    if (player.stats.deaths !== 0) {
      kdr = Number(player.stats.kills / player.stats.deaths).toFixed(1)
    }

    const totalShots =
      player.stats.chest_shots +
      player.stats.other_shots +
      player.stats.head_shots

    let hsPercent = '0.0%'
    if (totalShots !== 0) {
      hsPercent =
        String(
          Number((player.stats.head_shots * 100) / totalShots).toFixed(1)
        ) + '%'
    }

    // calculate Average Damage Ratio
    const adr = Number(player.stats.damage / match.rounds).toFixed(2)

    const fk = player.stats.firstkills

    const statsValues = [kda, kdr, hsPercent, adr, fk]

    return statsFields.map((stats, index) => (
      <Container key={index} column gap={11}>
        <Tooltip label={stats.label} aria-label={`${stats.field} tooltip`}>
          <Text
            as="span"
            color="gray.700"
            fontWeight="medium"
            fontSize={12}
            align="flex-start"
            textTransform="uppercase"
            lineHeight={1}
          >
            {stats.field}
          </Text>
        </Tooltip>
        <Text
          as="span"
          fontSize={16}
          fontWeight="semiBold"
          color="white"
          align="flex-start"
          lineHeight={1}
          data-testid={stats.field}
        >
          {statsValues[index]}
        </Text>
      </Container>
    ))
  }

  return (
    <Link
      as={RouterLink}
      to={`/partidas/${match.id}`}
      align="center"
      className={[style.container, won ? style.won : style.defeated].join(' ')}
    >
      <Container column gap={8}>
        <Text
          as="span"
          fontSize={20}
          fontWeight="medium"
          lineHeight={1}
          letterSpacing="0.5pt"
          color="white"
        >
          {match.map_name || 'Map Name'}
        </Text>
        <Text lineHeight={1} color="gray.700" fontSize={14} fontWeight="medium">
          {DateTime.fromISO(match.end_date).toRelative()}
        </Text>
      </Container>

      <Container>
        <Text
          as="span"
          fontSize={24}
          fontWeight="semiBold"
          textAlign="center"
          color="white"
        >
          {won ? winner_team.score : defeated_team.score}
          <Text
            pos="relative"
            color="white"
            fontSize={24}
            w="14px"
            as="span"
            display="inline-block"
          >
            :
          </Text>
          {won ? defeated_team.score : winner_team.score}
        </Text>
      </Container>

      <Container align="center" justify="center" gap={40}>
        {renderStats()}

        <Icon as={ArrowRightSimpleIcon} fill="white" h="12px" w="7px" />
      </Container>
    </Link>
  )
}
