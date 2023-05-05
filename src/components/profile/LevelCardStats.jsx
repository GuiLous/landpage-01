import { Text } from '@chakra-ui/react'

import { Container, LevelBadge } from '@components'

import style from './LevelCardStats.module.css'

export default function LevelCardStats({ user }) {
  return (
    <Container className={style.container} column>
      <Container className={style.topStats} gap={20} fitContent>
        <Container className={style.avatar}>
          <LevelBadge level={user.level} />
        </Container>
        <Container column gap={4} justify="center">
          <Text fontSize={16} fontWeight={700} color="#00E4C9" as="span">
            Level {user.level}
          </Text>
          <Container gap={15}>
            <Text fontSize={14} fontWeight={500} color="#f2f2f2" as="span">
              {user.wins}V {user.loses}D
            </Text>
            <Text fontSize={14} fontWeight={500} color="#00E4C9" as="span">
              {user.win_rate}%
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
            <Text fontSize={12} as="span" minW="80px">
              Abates/Mortes
            </Text>

            <Text fontSize={14} fontWeight={600} color="#00E4C9" as="span">
              {user.kda_rate}
            </Text>
          </Container>
          <Container
            align="center"
            gap={12}
            fitContent
            className={style.centerStats}
          >
            <Text fontSize={12} minW="78px" as="span">
              Dano/Rodada
            </Text>
            <Text fontSize={14} fontWeight={600} color="#00E4C9" as="span">
              {user.adr_rate}
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
            <Text fontSize={12} as="span" minW="80px">
              Headshots
            </Text>
            <Text fontSize={14} fontWeight={600} color="#00E4C9" as="span">
              {user.hs_percent}%
            </Text>
          </Container>
          <Container
            align="center"
            gap={12}
            fitContent
            className={style.centerStats}
          >
            <Text fontSize={12} as="span" lineHeight={0.9}>
              Pontuação de Combate
            </Text>
            <Text fontSize={14} fontWeight={600} color="#00E4C9" as="span">
              {user.combat_points}
            </Text>
          </Container>
        </Container>

        <Container align="center" fitContent>
          <Container align="center" gap={12} className={style.centerStats}>
            <Text fontSize={12} as="span" lineHeight={0.9} minW="80px">
              Pontuação Econômica
            </Text>
            <Text fontSize={14} fontWeight={600} color="#00E4C9" as="span">
              {user.economic_points}%
            </Text>
          </Container>
        </Container>
      </Container>
    </Container>
  )
}
