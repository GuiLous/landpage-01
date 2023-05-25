import { Text, Tooltip } from '@chakra-ui/react'

import { Container, LevelBadge, ProfileCard } from '@components'

import style from './LevelStatsCard.module.css'

export default function LevelStatsCard({
  level,
  highest_level,
  match_wins,
  highest_win_streak,
  latest_matches_results,
  stats,
}) {
  const renderLastMatches = latest_matches_results.map(
    (matchResultItem, index) => (
      <Container fitContent key={index}>
        <Text
          className={style.matchResultItem}
          color={matchResultItem === 'V' && 'secondary.400'}
        >
          {matchResultItem}
        </Text>
        <Text color="rgba(255, 255, 255, .3)" margin="0 3px">
          {latest_matches_results.length !== index + 1 && ' - '}
        </Text>
      </Container>
    )
  )

  return (
    <ProfileCard>
      <Container column>
        <Container gap={20} align="center">
          <Container className={style.level} fitContent>
            <LevelBadge level={level} />
          </Container>

          <Container column>
            <Text className={style.title}>
              <Text as="span">{match_wins}</Text> Vitórias
            </Text>
            <Container className={style.subtitle}>
              {renderLastMatches}
            </Container>
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
              <Text className={style.statsListItemValue}>
                {(stats.kills / stats.deaths).toFixed(2)}
              </Text>
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

            <Container
              column
              className={[style.statsListItem, style.maxWinStreak].join(' ')}
            >
              <Tooltip
                label="Maior quantidade de vitórias seguidas"
                aria-label="Maior quantidade de vitórias seguidas"
              >
                <Text className={style.statsListItemTitle}>Max Win Streak</Text>
              </Tooltip>
              <Text className={style.statsListItemValue}>
                {highest_win_streak}
              </Text>
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
                  {stats.most_kills_in_a_match}
                </Text>
              </Container>
            </Container>

            <Container className={style.statsListItem} justify="center">
              <Container column fitContent>
                <Tooltip
                  label="Rounds vencidos em situações 1vX"
                  aria-label="Rounds vencidos em situações 1vX"
                >
                  <Text className={style.statsListItemTitle}>Clutches</Text>
                </Tooltip>
                <Text className={style.statsListItemValue}>
                  {stats.clutch_v1 +
                    stats.clutch_v2 +
                    stats.clutch_v3 +
                    stats.clutch_v4 +
                    stats.clutch_v5}
                </Text>
              </Container>
            </Container>
          </Container>

          <Container column fitContent style={{ paddingLeft: '32px' }}>
            <Container className={style.statsListItem}>
              <Container column fitContent>
                <Tooltip
                  label="Percentual de acertos na cabeça"
                  aria-label="Percentual de acertos na cabeça"
                >
                  <Text className={style.statsListItemTitle}>Headshots %</Text>
                </Tooltip>
                <Text className={style.statsListItemValue}>
                  {Math.ceil((stats.head_shots / stats.shots_fired) * 100)}%
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
                  {stats.most_damage_in_a_match}
                </Text>
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    </ProfileCard>
  )
}
