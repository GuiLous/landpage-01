import { Text } from '@chakra-ui/react'

import { Container, LevelBadge } from '@components'

import style from './LevelCardStats.module.css'

export default function LevelCardStats({ profile }) {
  return (
    <Container className={style.container} column>
      <Container className={style.topStats} gap={20} fitContent>
        <Container className={style.avatar}>
          <LevelBadge level={profile.level} />
        </Container>
        <Container column gap={4} justify="center">
          <Text fontSize={16} fontWeight={700} color="secondary.400" as="span">
            LEVEL {profile.level}
          </Text>
          <Container gap={15}>
            <Text fontSize={14} fontWeight={500} color="#f2f2f2" as="span">
              {profile.stats.wins}V {profile.stats.loses}D
            </Text>
            <Text
              fontSize={14}
              fontWeight={500}
              color="secondary.400"
              as="span"
            >
              {profile.stats.win_rate}%
            </Text>
          </Container>
        </Container>
      </Container>

      <Container column gap={24}>
        <Container align="center" justify="between" fitContent>
          <Container
            align="center"
            justify="between"
            gap={12}
            fitContent
            className={style.centerStats}
          >
            <Text fontSize={12} color="#fff" minW="80px" as="span">
              Abates/Mortes
            </Text>

            <Text
              fontSize={14}
              fontWeight={600}
              color="secondary.400"
              as="span"
            >
              {profile.stats.kda_rate}
            </Text>
          </Container>
          <Container
            align="center"
            gap={12}
            fitContent
            className={style.centerStats}
          >
            <Text fontSize={12} color="#fff" minW="78px" as="span">
              Dano/Rodada
            </Text>
            <Text
              fontSize={14}
              fontWeight={600}
              color="secondary.400"
              as="span"
            >
              {profile.stats.adr_rate}
            </Text>
          </Container>
        </Container>

        <Container align="center" justify="between" fitContent>
          <Container
            justify="between"
            gap={12}
            fitContent
            style={{ alignItems: 'flex-start' }}
            className={style.centerStats}
          >
            <Text fontSize={12} color="#fff" minW="80px" as="span">
              Headshots
            </Text>
            <Text
              fontSize={14}
              fontWeight={600}
              color="secondary.400"
              as="span"
            >
              {profile.stats.hs_percent}%
            </Text>
          </Container>
          <Container
            align="center"
            gap={12}
            fitContent
            className={style.centerStats}
          >
            <Text fontSize={12} color="#fff" lineHeight={0.9} as="span">
              Pontuação de Combate
            </Text>
            <Text
              fontSize={14}
              fontWeight={600}
              color="secondary.400"
              as="span"
            >
              {profile.stats.combat_points}
            </Text>
          </Container>
        </Container>

        <Container align="center" fitContent>
          <Container
            align="center"
            color="#fff"
            gap={12}
            className={style.centerStats}
          >
            <Text fontSize={12} lineHeight={0.9} minW="80px" as="span">
              Pontuação Econômica
            </Text>
            <Text
              fontSize={14}
              fontWeight={600}
              color="secondary.400"
              as="span"
            >
              {profile.stats.economic_points}%
            </Text>
          </Container>
        </Container>
      </Container>
    </Container>
  )
}
