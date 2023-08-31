import { Text } from '@chakra-ui/react'
import { useSpring } from '@react-spring/web'
import { useState } from 'react'
import CountUp from 'react-countup'

import { Container, LevelBadge, Progress } from '@components'

import style from './LevelProgressBar.module.css'

export default function LevelProgressBar({
  points_earned,
  level_points_before,
  level_points_after,
  level_before,
  level_after,
}) {
  const [levelUpdateReady, setLevelUpdateReady] = useState(false)

  const levelChange = level_before !== level_after

  const levelAnimation = useSpring({
    from: { transform: 'scale(1)' },
    to: async (next, cancel) => {
      if (levelChange) await next({ transform: 'scale(1.4)', reverse: true })
    },
    config: { duration: 200 },
    delay: 550,
    onRest: () => {
      setLevelUpdateReady(true)
    },
  })

  return (
    <Container align="end" className={style.container}>
      <Container
        className={style.level}
        fitContent
        style={{ left: 8, ...levelAnimation }}
      >
        <LevelBadge
          level={levelUpdateReady ? level_after : level_before}
          size="sm"
        />
      </Container>

      <Container column gap={5}>
        <Container>
          <Progress
            initial={level_points_before}
            value={points_earned}
            horizontalPadding={
              level_points_before < 7 && points_earned < 10 && points_earned > 0
                ? 37
                : 0
            }
          />
        </Container>

        <Container justify="between">
          <Container>
            <Text textTransform={'uppercase'} fontSize={12}>
              Level {level_after}
            </Text>
          </Container>

          <Container justify="end">
            <Text fontSize={12} fontWeight="medium" color="white" as={'span'}>
              <CountUp start={level_points_before} end={level_points_after} />
            </Text>

            <Text as={'span'} fontWeight="regular" fontSize={12} color="white">
              /100
            </Text>
          </Container>
        </Container>
      </Container>

      <Container
        className={style.level}
        fitContent
        style={{ right: 8, ...levelAnimation }}
      >
        <LevelBadge
          level={levelUpdateReady ? level_after + 1 : level_before + 1}
          size="sm"
        />
      </Container>
    </Container>
  )
}
