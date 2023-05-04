import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { DateTime } from 'luxon'

import { Container } from '@components'

import style from './MatchHistoryStatsAccordion.module.css'

export default function MatchHistoryStatsAccordion({ user, match }) {
  const winner_team_id = match.winner_id
  const winner_team = match.teams.find((team) => team.id === winner_team_id)
  const defeated_team = match.teams.find((team) => team.id !== winner_team_id)
  const won = winner_team.players.find((player) => player.user_id === user.id)

  const player = won
    ? won
    : defeated_team.players.find((player) => player.user_id === user.id)

  const kda = Number(
    (player.stats.kills + player.stats.deaths) / player.stats.assists
  ).toFixed(2)

  const kpr = Number(player.stats.kills / match.rounds).toFixed(2)
  const adr = Number(player.stats.damage / match.rounds).toFixed(2)

  const hsPercent = Number(
    (player.stats.head_shots * 100) /
      (player.stats.chest_shots +
        player.stats.other_shots +
        player.stats.head_shots)
  ).toFixed(1)

  const startDate = DateTime.fromISO(match.start_date)
  const endDate = DateTime.fromISO(match.end_date)
  const matchDurationFormatted = endDate
    .diff(startDate, 'seconds')
    .toFormat('hh:mm')

  return (
    <Accordion
      allowMultiple
      w="full"
      border="1px solid #434343"
      borderRadius={8}
      bgColor="gray.900"
    >
      <AccordionItem px="16px" py="18px" border="none">
        <Container align="stretch">
          <Container
            className={[style.borderLeft, won && style.won].join(' ')}
          />

          <Container className={style.leftInfo} gap={10} align="center">
            <Avatar
              variant={user.status}
              size="lg"
              src={user.account.avatar.medium}
            />

            <Container column gap={8}>
              <Text
                as="span"
                fontSize={20}
                fontWeight={500}
                lineHeight="1"
                letterSpacing="0.5pt"
                color={won ? 'success' : 'danger.400'}
              >
                {won ? 'Vitória' : 'Derrota'}
              </Text>
              <Text
                lineHeight="1"
                color="gray.700"
                fontSize={14}
                fontWeight={500}
              >
                {match.map_name}
              </Text>
            </Container>
          </Container>

          <Container
            className={style.centerInfo}
            align="center"
            justify="center"
            gap={32}
          >
            <Container className={style.statsCenterInfos}>
              <Text
                as="span"
                fontSize={24}
                fontWeight={700}
                textAlign="center"
                color="#fff"
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

            <Container column className={style.statsCenterInfos}>
              <Tooltip
                label="Abates/Mortes/Assistências"
                aria-label="Kda tooltip"
              >
                <Text
                  as="span"
                  fontSize={16}
                  fontWeight={700}
                  color="#fff"
                  align="flex-start"
                >
                  {player.stats.kills}/{player.stats.deaths}/
                  {player.stats.assists}
                </Text>
              </Tooltip>
              <Tooltip
                label="Relação de abates e assistências por morte"
                aria-label="Kill death assist tooltip"
              >
                <Text
                  as="span"
                  color="gray.700"
                  fontWeight={500}
                  fontSize={14}
                  align="flex-start"
                  data-testid="kda"
                >
                  {kda} KDA
                </Text>
              </Tooltip>
            </Container>

            <Container column className={style.statsCenterInfos}>
              <Tooltip label="Abates por round" aria-label="Kpr tooltip">
                <Text
                  as="span"
                  fontSize={16}
                  fontWeight={700}
                  color="#fff"
                  align="flex-start"
                  data-testid="kpr"
                >
                  {kpr} KPR
                </Text>
              </Tooltip>

              <Tooltip label="Dano médio por round" aria-label="Adr tooltip">
                <Text
                  as="span"
                  color="gray.700"
                  fontWeight={500}
                  fontSize={14}
                  align="flex-start"
                  data-testid="adr"
                >
                  {adr} ADR
                </Text>
              </Tooltip>
            </Container>

            <Container
              column
              style={{ minWidth: '100px' }}
              align="start"
              className={style.statsCenterInfos}
            >
              <Text
                as="span"
                textAlign="left"
                fontSize={16}
                fontWeight={700}
                color="#fff"
              >
                {player.points_earned > 0
                  ? `+${player.points_earned}`
                  : player.points_earned}{' '}
                Pontos ganhos
              </Text>

              <Tooltip
                label="Porcentagem de tiros na cabeça"
                aria-label="Hs tooltip"
              >
                <Text
                  as="span"
                  color="gray.700"
                  fontWeight={500}
                  fontSize={14}
                  align="flex-start"
                  data-testid="hs"
                >
                  {hsPercent}% HS
                </Text>
              </Tooltip>
            </Container>
          </Container>

          <Container
            className={style.rightInfo}
            column
            align="center"
            justify="center"
          >
            <Tooltip label="Duração da partida" aria-label="Duration tooltip">
              <Text
                as="span"
                mr="3px"
                fontSize={14}
                fontWeight={500}
                color="gray.700"
              >
                {endDate.toFormat('MMM dd')} - {matchDurationFormatted}
              </Text>
            </Tooltip>

            <AccordionButton width="fit-content" p={0} color="secondary.400">
              <Text as="span" textAlign="left" fontSize={14}>
                Ver detalhes
              </Text>
              <AccordionIcon />
            </AccordionButton>
          </Container>
        </Container>

        <AccordionPanel>content</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
