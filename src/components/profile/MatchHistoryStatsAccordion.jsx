import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { DateTime } from 'luxon'

import { Container } from '@components'

import { useState } from 'react'
import style from './MatchHistoryStatsAccordion.module.css'

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

export default function MatchHistoryStatsAccordion({ user, match }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleAccordionToggle = () => {
    setIsOpen(!isOpen)
  }

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
    const kdr = Number(player.stats.kills / player.stats.deaths).toFixed(1)

    const hsPercent =
      String(
        Number(
          (player.stats.head_shots * 100) /
            (player.stats.chest_shots +
              player.stats.other_shots +
              player.stats.head_shots)
        ).toFixed(1)
      ) + '%'

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
          data-testid={stats.field}
        >
          {statsValues[index]}
        </Text>
      </Container>
    ))
  }

  return (
    <Accordion
      allowMultiple
      w="full"
      borderRadius={8}
      className={[
        style.container,
        won ? style.won : style.defeated,
        isOpen && style.expand,
      ].join(' ')}
    >
      <AccordionItem p={6} border="none">
        <Container align="center">
          <Container column gap={10}>
            <Text
              as="span"
              fontSize={20}
              fontWeight="medium"
              lineHeight="1"
              letterSpacing="0.5pt"
              color="white"
            >
              {match.map_name}
            </Text>
            <Text
              lineHeight="1"
              color="gray.700"
              fontSize={14}
              fontWeight="medium"
            >
              {DateTime.fromISO(match.end_date).toRelative()}
            </Text>
          </Container>

          <Container>
            <Text
              as="span"
              fontSize={24}
              fontWeight="bold"
              textAlign="center"
              color="white"
            >
              {won ? winner_team.score : defeated_team.score}
              <Text
                pos="relative"
                top={-1}
                color="gray.700"
                fontSize={20}
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

            <AccordionButton p={0} onClick={handleAccordionToggle}>
              <AccordionIcon />
            </AccordionButton>
          </Container>
        </Container>

        <AccordionPanel>content</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
