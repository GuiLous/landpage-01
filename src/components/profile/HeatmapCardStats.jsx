import { Icon, Text } from '@chakra-ui/react'

import { Container } from '@components'

import style from './HeatmapCardStats.module.css'

import FullBodyIcon from '../icons/FullBodyIcon'

export default function HeatmapCardStats({
  head_shots,
  chest_shots,
  other_shots,
}) {
  const totalShots = head_shots + chest_shots + other_shots

  const headShotsPercent =
    totalShots === 0 ? 0 : Number((head_shots * 100) / totalShots).toFixed(1)
  const chestShotsPercent =
    totalShots === 0 ? 0 : Number((chest_shots * 100) / totalShots).toFixed(1)
  const otherShotsPercent =
    totalShots === 0 ? 0 : Number((other_shots * 100) / totalShots).toFixed(1)

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
            opacityOthers={otherShotsPercent / 100}
            opacityChest={chestShotsPercent / 100}
            opacityHead={headShotsPercent / 100}
          />
        </Container>

        <Container column className={style.centerStats}>
          <Container align="center" justify="between" fitContent>
            <Container column justify="between" gap={3} fitContent>
              <Text
                lineHeight={1}
                fontSize={12}
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
                data-testid="hs-percentage"
              >
                {headShotsPercent}%
              </Text>
            </Container>

            <Container column gap={3} fitContent>
              <Text
                lineHeight={1}
                fontSize={16}
                fontWeight={700}
                color="secondary.400"
                as="span"
              >
                {head_shots}
              </Text>
              <Text fontSize={12} fontWeight={500} color="gray.700" as="span">
                ACERTOS
              </Text>
            </Container>
          </Container>

          <Container align="center" justify="between" fitContent>
            <Container column justify="between" gap={3} fitContent>
              <Text
                lineHeight={1}
                fontSize={12}
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
                data-testid="body-percentage"
              >
                {chestShotsPercent}%
              </Text>
            </Container>

            <Container column gap={3} fitContent>
              <Text
                lineHeight={1}
                fontSize={16}
                fontWeight={700}
                color="secondary.400"
                as="span"
              >
                {chest_shots}
              </Text>
              <Text fontSize={12} fontWeight={500} color="gray.700" as="span">
                ACERTOS
              </Text>
            </Container>
          </Container>

          <Container align="center" justify="between" fitContent>
            <Container column justify="between" gap={3} fitContent>
              <Text
                lineHeight={1}
                fontSize={12}
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
                data-testid="other-percentage"
              >
                {otherShotsPercent}%
              </Text>
            </Container>

            <Container column gap={3} fitContent>
              <Text
                lineHeight={1}
                fontSize={16}
                fontWeight={700}
                color="secondary.400"
                as="span"
              >
                {other_shots}
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
