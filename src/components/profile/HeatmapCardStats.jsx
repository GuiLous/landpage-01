import { Text } from '@chakra-ui/react'

import { Container } from '@components'

import style from './HeatmapCardStats.module.css'

export default function HeatmapCardStats({ profile }) {
  return (
    <Container className={style.container} column gap={23}>
      <Container gap={5} fitContent column>
        <Text
          fontSize={14}
          fontWeight={700}
          lineHeight={1}
          color="#fff"
          as="span"
        >
          % MÉDIA DE HEADSHOTS
        </Text>
        <Text
          fontSize={12}
          fontWeight={500}
          lineHeight={1}
          color="secondary.400"
          as="span"
        >
          Últimas 20 Partidas
        </Text>
      </Container>

      <Container gap={25} align="center">
        <Container align="center" justify="center" fitContent>
          Boneco
        </Container>

        <Container column className={style.centerStats}>
          <Container align="center" justify="between" fitContent>
            <Container justify="between" gap={13} fitContent>
              <Text fontSize={14} fontWeight={500} color="#fff" as="span">
                HEAD
              </Text>
              <Text
                fontSize={16}
                fontWeight={700}
                color="secondary.400"
                as="span"
              >
                10,4%
              </Text>
            </Container>

            <Container align="center" gap={12} fitContent>
              <Text
                fontSize={16}
                fontWeight={700}
                color="secondary.400"
                as="span"
              >
                300
              </Text>
              <Text fontSize={12} fontWeight={500} color="gray.700" as="span">
                HITS
              </Text>
            </Container>
          </Container>

          <Container align="center" justify="between" fitContent>
            <Container justify="between" gap={13} fitContent>
              <Text fontSize={14} fontWeight={500} color="#fff" as="span">
                BODY
              </Text>
              <Text
                fontSize={16}
                fontWeight={700}
                color="secondary.400"
                as="span"
              >
                78,7%
              </Text>
            </Container>

            <Container align="center" gap={12} fitContent>
              <Text
                fontSize={16}
                fontWeight={700}
                color="secondary.400"
                as="span"
              >
                430
              </Text>
              <Text fontSize={12} fontWeight={500} color="gray.700" as="span">
                HITS
              </Text>
            </Container>
          </Container>

          <Container align="center" justify="between" fitContent>
            <Container justify="between" gap={13} fitContent>
              <Text fontSize={14} fontWeight={500} color="#fff" as="span">
                LEGS
              </Text>
              <Text
                fontSize={16}
                fontWeight={700}
                color="secondary.400"
                as="span"
              >
                10,9%
              </Text>
            </Container>

            <Container align="center" gap={12} fitContent>
              <Text
                fontSize={16}
                fontWeight={700}
                color="secondary.400"
                as="span"
              >
                100
              </Text>
              <Text fontSize={12} fontWeight={500} color="gray.700" as="span">
                HITS
              </Text>
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  )
}
