/* eslint-disable react-hooks/exhaustive-deps */
import { Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import CountUp from 'react-countup'

import { Container, LevelBadge } from '@components'

import style from './LevelProgressBar.module.css'

export default function LevelProgressBar({
  earned_points,
  level_points,
  level,
}) {
  const [userLevel, setUserLevel] = useState(level)
  const [nextLevelValue, setNextLevelValue] = useState(level + 1)
  const [userPoints, setUserPoints] = useState(level_points)
  const [pointsToRender, setPointsToRender] = useState(0)
  const [isNextLevel, setIsNextLevel] = useState(false)
  const [isPreviousLevel, setIsPreviousLevel] = useState(false)

  useEffect(() => {
    // add 1 to user level
    if (isNextLevel) {
      setTimeout(() => {
        setNextLevelValue(nextLevelValue + 1)
        setUserLevel(userLevel + 1)
      }, 1500)
    }
  }, [isNextLevel])

  useEffect(() => {
    // decrease 1 to user level
    if (isPreviousLevel) {
      setTimeout(() => {
        setNextLevelValue(nextLevelValue - 1)
        setUserLevel(userLevel - 1)
      }, 1500)
    }
  }, [isPreviousLevel])

  useEffect(() => {
    if (userPoints + earned_points >= 100) {
      const pointsDiffTo100 = 100 - userPoints

      setPointsToRender(pointsDiffTo100)

      setIsPreviousLevel(false)
      setIsNextLevel(true)

      setTimeout(() => {
        setUserPoints(0)
        setPointsToRender(0)

        if (userPoints + earned_points === 100) return

        setTimeout(() => {
          setPointsToRender((earned_points - pointsDiffTo100) % 100)
        }, 100)
      }, 1500)
    } else if (userPoints + earned_points < 0) {
      setPointsToRender(userPoints * -1)

      if (userLevel > 0) {
        setIsPreviousLevel(true)
        setIsNextLevel(false)

        setTimeout(() => {
          setUserPoints(100)
          setPointsToRender(0)

          if (userPoints + earned_points === -1) return

          setTimeout(() => {
            setPointsToRender(earned_points + userPoints)
          }, 100)
        }, 1500)
      }
    } else {
      setPointsToRender(earned_points)
    }
  }, [])

  return (
    <Container align="center" style={{ marginTop: '40px' }}>
      <Container
        className={
          isPreviousLevel
            ? `${style.leftImage} ${style.animateScale} `
            : style.leftImage
        }
      >
        <LevelBadge level={userLevel} small />
      </Container>

      <Container column gap={4} style={{ marginTop: '18px' }}>
        <Container
          className={style.progressBackGround}
          style={{ position: pointsToRender < 0 ? 'relative' : 'initial' }}
        >
          <Container
            className={
              pointsToRender < 0
                ? `${style.initialProgress} ${style.transition}`
                : style.initialProgress
            }
            style={{
              width:
                pointsToRender < 0
                  ? `${userPoints + pointsToRender}%`
                  : `${userPoints}%`,
              position: pointsToRender < 0 ? 'absolute' : 'relative',
            }}
          >
            {pointsToRender < 0 && (
              <Text className={style.points} right={-16}>
                <CountUp
                  end={pointsToRender}
                  prefix={pointsToRender >= 0 ? '+' : ''}
                />
                pts
              </Text>
            )}
          </Container>

          {pointsToRender < 0 ? (
            <Container
              className={style.progressDown}
              style={{ width: `${Math.abs(userPoints)}%` }}
            />
          ) : (
            <Container
              style={{
                maxWidth: `${Math.abs(pointsToRender)}%`,
              }}
            >
              <Container className={`${style.progressBar} ${style.progressUp}`}>
                {/* verifications to calcule the necessary gap on the sides of the text
                    (right or left) so the level images don`t overflow the quantity points text
                */}
                <Text
                  className={style.points}
                  right={
                    userLevel >= 30 // the icon level when the level is greater than 30 is bigger
                      ? pointsToRender <= 4
                        ? pointsToRender + userPoints >= 98
                          ? '10px'
                          : pointsToRender === 0
                          ? '-54px'
                          : '-38px'
                        : pointsToRender + userPoints >= 98
                        ? '10px'
                        : '6px'
                      : pointsToRender <= 3
                      ? userPoints + pointsToRender >= 98
                        ? '12px'
                        : pointsToRender === 0
                        ? '-46px'
                        : '-30px'
                      : '6px'
                  }
                >
                  <CountUp
                    end={pointsToRender}
                    prefix={pointsToRender >= 0 ? '+' : ''}
                  />
                  pts
                </Text>
              </Container>
            </Container>
          )}
        </Container>

        <Container style={{ padding: '0 10px' }} justify="between">
          <Text fontSize={14}>CLASSIFICAÇÃO RANQUEADA</Text>
          <Text fontSize={12}>
            <Text as="span" color="secondary.400">
              {userPoints}
            </Text>

            <Text as="span">/100</Text>
          </Text>
        </Container>
      </Container>

      <Container
        className={
          isNextLevel
            ? `${style.rightImage} ${style.animateScale} `
            : style.rightImage
        }
      >
        <LevelBadge level={nextLevelValue} small />
      </Container>
    </Container>
  )
}
