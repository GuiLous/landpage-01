import { Icon, Text } from '@chakra-ui/react'

import { Container } from '@components'

import style from './HeatmapCardStats.module.css'

import FullBodyIcon from '../icons/FullBodyIcon'

export default function HeatmapCardStats({ profile }) {
  const totalShots =
    profile.stats.head_shots +
    profile.stats.chest_shots +
    profile.stats.other_shots

  const headShotsPercent = Number(
    (profile.stats.head_shots * 100) / totalShots
  ).toFixed(1)
  const chestShotsPercent = Number(
    (profile.stats.chest_shots * 100) / totalShots
  ).toFixed(1)
  const otherShotsPercent = Number(
    (profile.stats.other_shots * 100) / totalShots
  ).toFixed(1)

  return (
    <Container className={style.container} column gap={40}>
      <Container gap={5} fitContent column>
        <Text
          fontSize={14}
          fontWeight={700}
          lineHeight={1}
          color="#fff"
          as="span"
        >
          HEATMAP DE ACERTOS
        </Text>
        {/* <Text
          fontSize={12}
          fontWeight={500}
          lineHeight={1}
          color="secondary.400"
          as="span"
        >
          Últimas 20 Partidas
        </Text> */}
      </Container>

      <Container gap={40} align="center">
        <Container
          className={style.bodyContainer}
          align="center"
          justify="center"
          fitContent
        >
          <Icon
            as={FullBodyIcon}
            w={230}
            h={230}
            opacityLegs={otherShotsPercent / 100}
            opacityBody={chestShotsPercent / 100}
            opacityHead={headShotsPercent / 100}
          />
        </Container>

        <Container column className={style.centerStats}>
          <Container align="center" justify="between" fitContent>
            <Container column justify="between" gap={5} fitContent>
              <Text
                lineHeight={1}
                fontSize={14}
                fontWeight={500}
                color="#fff"
                as="span"
              >
                CABEÇA
              </Text>
              <Text
                fontSize={16}
                fontWeight={700}
                color="secondary.400"
                as="span"
              >
                {headShotsPercent}%
              </Text>
            </Container>

            <Container column gap={5} fitContent>
              <Text
                fontSize={16}
                fontWeight={700}
                color="secondary.400"
                as="span"
              >
                {profile.stats.head_shots}
              </Text>
              <Text fontSize={12} fontWeight={500} color="gray.700" as="span">
                ACERTOS
              </Text>
            </Container>
          </Container>

          <Container align="center" justify="between" fitContent>
            <Container column justify="between" gap={5} fitContent>
              <Text
                lineHeight={1}
                fontSize={14}
                fontWeight={500}
                color="#fff"
                as="span"
              >
                CORPO
              </Text>
              <Text
                fontSize={16}
                fontWeight={700}
                color="secondary.400"
                as="span"
              >
                {chestShotsPercent}%
              </Text>
            </Container>

            <Container column gap={5} fitContent>
              <Text
                fontSize={16}
                fontWeight={700}
                color="secondary.400"
                as="span"
              >
                {profile.stats.chest_shots}
              </Text>
              <Text fontSize={12} fontWeight={500} color="gray.700" as="span">
                ACERTOS
              </Text>
            </Container>
          </Container>

          <Container align="center" justify="between" fitContent>
            <Container column justify="between" gap={5} fitContent>
              <Text
                lineHeight={1}
                fontSize={14}
                fontWeight={500}
                color="#fff"
                as="span"
              >
                PERNAS
              </Text>
              <Text
                fontSize={16}
                fontWeight={700}
                color="secondary.400"
                as="span"
              >
                {otherShotsPercent}%
              </Text>
            </Container>

            <Container column gap={5} fitContent>
              <Text
                fontSize={16}
                fontWeight={700}
                color="secondary.400"
                as="span"
              >
                {profile.stats.other_shots}
              </Text>
              <Text fontSize={12} fontWeight={500} color="gray.700" as="span">
                ACERTOS
              </Text>
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  )
}
