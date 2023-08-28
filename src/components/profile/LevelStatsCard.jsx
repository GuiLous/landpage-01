import { Text, Tooltip } from '@chakra-ui/react'

import { Container, LevelBadge, ProfileCard } from '@components'
import { useLatestMatchesResults } from '@hooks'

import style from './LevelStatsCard.module.css'

export default function LevelStatsCard({
  level,
  highest_level,
  match_won,
  highest_win_streak,
  latest_matches_results,
  most_kills_in_a_match,
  most_damage_in_a_match,
  stats,
}) {
  const latestResults = useLatestMatchesResults(latest_matches_results)

  return (
    <ProfileCard>
      <Container column>
        <Container gap={20} align="center">
          <Container className={style.level} fitContent>
            <LevelBadge level={level} />
          </Container>

          <Container column>
            <Text className={style.title}>
              <Text as="span">{match_won}</Text> Vitórias
            </Text>
            <Container className={style.subtitle}>{latestResults}</Container>
          </Container>
        </Container>

        <Container className={style.statsList}>
          <Container column fitContent>
            <Container column className={style.statsListItem}>
              <Tooltip
                label="Média de abates e mortes por partida"
                aria-label="Média de abates e mortes por partida"
              >
                <Text className={style.statsListItemTitle}>KDR</Text>
              </Tooltip>
              <Text className={style.statsListItemValue}>{stats.kdr || 0}</Text>
            </Container>

            <Container column className={style.statsListItem}>
              <Tooltip
                label="Maior level atingido"
                aria-label="Maior level atingido"
              >
                <Text className={style.statsListItemTitle}>Max Level</Text>
              </Tooltip>
              <Text className={style.statsListItemValue}>{highest_level}</Text>
            </Container>
          </Container>

          <Container column>
            <Container className={style.statsListItem} justify="center">
              <Container column fitContent>
                <Tooltip
                  label="Maior quantidade de abates em uma partida"
                  aria-label="Maior quantidade de abates em uma partida"
                >
                  <Text className={style.statsListItemTitle}>Max Kills</Text>
                </Tooltip>
                <Text className={style.statsListItemValue}>
                  {most_kills_in_a_match || 0}
                </Text>
              </Container>
            </Container>

            <Container className={style.statsListItem} justify="center">
              <Container column fitContent>
                <Tooltip
                  label="Max Win Streak: Maior quantidade de vitórias seguidas"
                  aria-label="Maior quantidade de vitórias seguidas"
                >
                  <Text className={style.statsListItemTitle}>Max Wins</Text>
                </Tooltip>
                <Text className={style.statsListItemValue}>
                  {highest_win_streak}
                </Text>
              </Container>
            </Container>
          </Container>

          <Container column fitContent style={{ paddingLeft: '32px' }}>
            <Container className={style.statsListItem}>
              <Container column fitContent>
                <Tooltip
                  label="Percentual de abates por tiros na cabeça"
                  aria-label="Percentual de abates por tiros na cabeça"
                >
                  <Text className={style.statsListItemTitle}>Hs Kills %</Text>
                </Tooltip>
                <Text className={style.statsListItemValue}>
                  {stats.hsk || 0}%
                </Text>
              </Container>
            </Container>

            <Container className={style.statsListItem}>
              <Container column fitContent>
                <Tooltip
                  label="Maior quantidade de dano causado em uma partida"
                  aria-label="Maior quantidade de dano causado em uma partida"
                >
                  <Text className={style.statsListItemTitle}>Max Dano</Text>
                </Tooltip>
                <Text className={style.statsListItemValue}>
                  {most_damage_in_a_match || 0}
                </Text>
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    </ProfileCard>
  )
}
