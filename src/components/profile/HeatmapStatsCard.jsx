import { Icon, Text } from '@chakra-ui/react'

import { Container, ProfileCard } from '@components'

import style from './HeatmapStatsCard.module.css'

import FullBodyIcon from '../icons/FullBodyIcon'

export default function HeatmapStatsCard({
  head_shots,
  chest_shots,
  other_shots,
}) {
  const totalShots = head_shots + chest_shots + other_shots

  const headShotsPercent =
    totalShots === 0 ? 0 : Number((head_shots * 100) / totalShots).toFixed(0)
  const chestShotsPercent =
    totalShots === 0 ? 0 : Number((chest_shots * 100) / totalShots).toFixed(0)
  const otherShotsPercent =
    totalShots === 0 ? 0 : Number((other_shots * 100) / totalShots).toFixed(0)

  return (
    <ProfileCard title="Heatmap de Acertos">
      <Container gap={40} className={style.container}>
        <Container
          className={style.bodyContainer}
          align="center"
          justify="center"
          fitContent
        >
          <Icon
            as={FullBodyIcon}
            w={238}
            h={238}
            mt={5}
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
                fontWeight="medium"
                color="gray.300"
                as="span"
              >
                CABEÇA
              </Text>
              <Text
                fontSize={16}
                fontWeight="bold"
                color="white"
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
                fontWeight="bold"
                color="white"
                as="span"
              >
                {head_shots}
              </Text>
              <Text
                fontSize={12}
                fontWeight="medium"
                color="gray.300"
                as="span"
              >
                ACERTOS
              </Text>
            </Container>
          </Container>

          <Container align="center" justify="between" fitContent>
            <Container column justify="between" gap={3} fitContent>
              <Text
                lineHeight={1}
                fontSize={12}
                fontWeight="medium"
                color="gray.300"
                as="span"
              >
                PEITO
              </Text>
              <Text
                fontSize={16}
                fontWeight="bold"
                color="white"
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
                fontWeight="bold"
                color="white"
                as="span"
              >
                {chest_shots}
              </Text>
              <Text
                fontSize={12}
                fontWeight="medium"
                color="gray.300"
                as="span"
              >
                ACERTOS
              </Text>
            </Container>
          </Container>

          <Container align="center" justify="between" fitContent>
            <Container column justify="between" gap={3} fitContent>
              <Text
                lineHeight={1}
                fontSize={12}
                fontWeight="medium"
                color="gray.300"
                as="span"
              >
                OUTROS
              </Text>
              <Text
                fontSize={16}
                fontWeight="bold"
                color="white"
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
                fontWeight="bold"
                color="white"
                as="span"
              >
                {other_shots}
              </Text>
              <Text
                fontSize={12}
                fontWeight="medium"
                color="gray.300"
                as="span"
              >
                ACERTOS
              </Text>
            </Container>
          </Container>
        </Container>
      </Container>
    </ProfileCard>
  )
}
