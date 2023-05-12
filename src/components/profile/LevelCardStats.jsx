import { Text, Tooltip } from '@chakra-ui/react'

import { Container, LevelBadge } from '@components'

import style from './LevelCardStats.module.css'

export default function LevelCardStats({
  level,
  highest_level,
  match_wins,
  highest_win_streak,
  latest_matches_results,
  stats,
}) {
  return (
    <Container className={style.container} column>
      <Container className={style.topStats} gap={20} fitContent>
        <Container className={style.avatar}>
          <LevelBadge level={level} />
        </Container>
        <Container column gap={8} justify="center">
          <Text
            fontSize={18}
            lineHeight={1}
            fontWeight={700}
            color="secondary.400"
            as="span"
          >
            {match_wins}{' '}
            <Text fontSize={18} fontWeight={700} color="#fff" as="span">
              VITÓRIAS
            </Text>
          </Text>
          <Container gap={4} align="center">
            {latest_matches_results.map((result, index) => (
              <>
                <Text
                  fontSize={12}
                  lineHeight={1}
                  fontWeight={500}
                  color={result === 'V' ? 'secondary.400' : 'gray.700'}
                  as="span"
                >
                  {result}
                </Text>

                {index !== latest_matches_results.length - 1 && (
                  <Container fitContent className={style.resultsSeparator} />
                )}
              </>
            ))}
          </Container>
        </Container>
      </Container>

      <Container column gap={18}>
        <Container align="center" gap={32} fitContent>
          <Container
            column
            gap={4}
            fitContent
            lineHeight={1}
            className={style.centerStats}
          >
            <Tooltip
              label="Média de abates e mortes por partida"
              aria-label="Média de abates e mortes por partida"
            >
              <Text fontSize={12} color="#fff" as="span">
                KDR
              </Text>
            </Tooltip>

            <Text
              fontSize={14}
              lineHeight={1}
              fontWeight={600}
              color="secondary.400"
              as="span"
            >
              {(stats.kills / stats.deaths).toFixed(2)}
            </Text>
          </Container>
          <Container column gap={4} lineHeight={1}>
            <Tooltip
              label="Maior level atingido"
              aria-label="Maior level atingido"
            >
              <Text fontSize={12} color="#fff" as="span">
                MAIOR LEVEL
              </Text>
            </Tooltip>
            <Text
              fontSize={14}
              lineHeight={1}
              fontWeight={600}
              color="secondary.400"
              as="span"
            >
              {highest_level}
            </Text>
          </Container>
        </Container>

        <Container align="center" gap={32} fitContent>
          <Container
            column
            gap={4}
            fitContent
            lineHeight={1}
            className={style.centerStats}
          >
            <Tooltip
              label="Rounds vencidos em situações 1vX"
              aria-label="Rounds vencidos em situações 1vX"
            >
              <Text fontSize={12} color="#fff" as="span">
                CLUTCHS
              </Text>
            </Tooltip>

            <Text
              fontSize={14}
              lineHeight={1}
              fontWeight={600}
              color="secondary.400"
              as="span"
            >
              {stats.clutch_v1 +
                stats.clutch_v2 +
                stats.clutch_v3 +
                stats.clutch_v4 +
                stats.clutch_v5}
            </Text>
          </Container>
          <Container column gap={4} lineHeight={1}>
            <Tooltip
              label="Maior quantidade de abates em uma partida"
              aria-label="Maior quantidade de abates em uma partida"
            >
              <Text fontSize={12} color="#fff" as="span">
                MAX KILLS
              </Text>
            </Tooltip>
            <Text
              fontSize={14}
              lineHeight={1}
              fontWeight={600}
              color="secondary.400"
              as="span"
            >
              {stats.most_kills_in_a_match}
            </Text>
          </Container>
        </Container>

        <Container align="center" gap={32} fitContent>
          <Container
            column
            gap={4}
            fitContent
            lineHeight={1}
            className={style.centerStats}
          >
            <Tooltip
              label="Percentual de acertos na cabeça"
              aria-label="Percentual de acertos na cabeça"
            >
              <Text fontSize={12} color="#fff" as="span">
                % HEADSHOTS
              </Text>
            </Tooltip>

            <Text
              fontSize={14}
              lineHeight={1}
              fontWeight={600}
              color="secondary.400"
              as="span"
            >
              {Math.ceil((stats.head_shots / stats.shots_fired) * 100)}%
            </Text>
          </Container>
          <Container column gap={4} lineHeight={1}>
            <Tooltip
              label="Maior quantidade de dano causado em uma partida"
              aria-label="Maior quantidade de dano causado em uma partida"
            >
              <Text fontSize={12} color="#fff" as="span">
                MAX DANO
              </Text>
            </Tooltip>
            <Text
              fontSize={14}
              lineHeight={1}
              fontWeight={600}
              color="secondary.400"
              as="span"
            >
              {stats.most_damage_in_a_match}
            </Text>
          </Container>
        </Container>

        <Container align="center" fitContent>
          <Container
            column
            gap={4}
            fitContent
            lineHeight={1}
            className={style.centerStats}
          >
            <Tooltip
              label="Maior quantidade de vitórias seguidas"
              aria-label="Maior quantidade de vitórias seguidas"
            >
              <Text fontSize={12} color="#fff" as="span">
                MAX WIN STREAK
              </Text>
            </Tooltip>

            <Text
              fontSize={14}
              lineHeight={1}
              fontWeight={600}
              color="secondary.400"
              as="span"
            >
              {highest_win_streak}
            </Text>
          </Container>
        </Container>
      </Container>
    </Container>
  )
}
