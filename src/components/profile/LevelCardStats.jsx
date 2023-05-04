import { Text } from '@chakra-ui/react'

import { Container, LevelBadge } from '@components'

import style from './LevelCardStats.module.css'

export default function LevelCardStats() {
  return (
    <Container className={style.container} column>
      <Container className={style.topStats} gap="20px" fitContent>
        <Container className={style.avatar}>
          <LevelBadge level={50} />
        </Container>
        <Container column gap="4px" justify="center">
          <Text fontSize={16} fontWeight={700} color="#00E4C9" as="span">
            Level 50
          </Text>
          <Container gap={15}>
            <Text fontSize={14} fontWeight={500} color="#f2f2f2" as="span">
              14V 8D
            </Text>
            <Text fontSize={14} fontWeight={500} color="#00E4C9" as="span">
              68%
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
            <Text fontSize={12} as="span">
              Abates/Mortes
            </Text>
            <Text fontSize={14} fontWeight={600} color="#00E4C9" as="span">
              0.88
            </Text>
          </Container>
          <Container
            align="center"
            gap={12}
            fitContent
            className={style.centerStats}
          >
            <Text fontSize={12}>Dano/Rodada</Text>
            <Text fontSize={14} fontWeight={600} color="#00E4C9">
              93,5
            </Text>
          </Container>
        </Container>

        <Container align="baseline" justify="between" fitContent>
          <Container
            align="center"
            justify="between"
            gap={12}
            fitContent
            className={style.centerStats}
          >
            <Text fontSize={12} as="span">
              Headshots
            </Text>
            <Text fontSize={14} fontWeight={600} color="#00E4C9" as="span">
              8%
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
              173
            </Text>
          </Container>
        </Container>

        <Container align="center" fitContent>
          <Container align="center" gap={12} className={style.centerStats}>
            <Text fontSize={12} as="span" lineHeight={0.9}>
              Pontuação Econômica
            </Text>
            <Text fontSize={14} fontWeight={600} color="#00E4C9" as="span">
              8%
            </Text>
          </Container>
        </Container>
      </Container>
    </Container>
  )
}
