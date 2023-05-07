import { Text, Tooltip } from '@chakra-ui/react'

import { Container, LevelBadge } from '@components'

import style from './LevelCardStats.module.css'

export default function LevelCardStats({ profile }) {
  const lastFiveMatchesResults = profile.last_five_matches

  return (
    <Container className={style.container} column>
      <Container className={style.topStats} gap={20} fitContent>
        <Container className={style.avatar}>
          <LevelBadge level={profile.level} />
        </Container>
        <Container column gap={8} justify="center">
          <Text
            fontSize={18}
            lineHeight={1}
            fontWeight={700}
            color="secondary.400"
            as="span"
          >
            {profile.stats.wins}{' '}
            <Text fontSize={18} fontWeight={700} color="#fff" as="span">
              VITÓRIAS
            </Text>
          </Text>
          <Container gap={4} align="center">
            {lastFiveMatchesResults.map((result, index) => (
              <>
                <Text
                  fontSize={12}
                  lineHeight={1}
                  fontWeight={500}
                  color={result === 'win' ? 'secondary.400' : 'gray.700'}
                  as="span"
                >
                  {result === 'win' ? 'V' : 'D'}
                </Text>

                {index !== lastFiveMatchesResults.length - 1 && (
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
                ABATES/MORTES
              </Text>
            </Tooltip>

            <Text
              fontSize={14}
              lineHeight={1}
              fontWeight={600}
              color="secondary.400"
              as="span"
            >
              {profile.stats.krd_rate}
            </Text>
          </Container>
          <Container column gap={4} lineHeight={1}>
            <Text fontSize={12} color="#fff" as="span">
              PONTUAÇÃO ECONÔMICA
            </Text>
            <Text
              fontSize={14}
              lineHeight={1}
              fontWeight={600}
              color="secondary.400"
              as="span"
            >
              {profile.stats.economic_points}
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
              label="Média de dano por partida"
              aria-label="Média de dano por partida"
            >
              <Text fontSize={12} color="#fff" as="span">
                DANO/RODADA
              </Text>
            </Tooltip>

            <Text
              fontSize={14}
              lineHeight={1}
              fontWeight={600}
              color="secondary.400"
              as="span"
            >
              {profile.stats.adr_rate}
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
              {profile.stats.max_kills}
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
            <Text fontSize={12} color="#fff" as="span">
              % HEADSHOTS
            </Text>

            <Text
              fontSize={14}
              lineHeight={1}
              fontWeight={600}
              color="secondary.400"
              as="span"
            >
              {profile.stats.hs_percent}%
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
              {profile.stats.max_damage}
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
            <Text fontSize={12} color="#fff" as="span">
              PONTUAÇÃO DE COMBATE
            </Text>

            <Text
              fontSize={14}
              lineHeight={1}
              fontWeight={600}
              color="secondary.400"
              as="span"
            >
              {profile.stats.combat_points}
            </Text>
          </Container>
        </Container>
      </Container>
    </Container>
  )
}
