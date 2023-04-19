/* eslint-disable react-hooks/exhaustive-deps */
import { Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import { useSelector } from 'react-redux'

import { Container, LevelBadge } from '@components'

import style from './LevelProgressBar.module.css'

export default function LevelProgressBar({ earnedPoints = 0 }) {
  const user = useSelector((state) => state.user)

  const [userLevel, setUserLevel] = useState(user.account.level)
  const [nextLevelValue, setNextLevelValue] = useState(user.account.level + 1)
  const [userPoints, setUserPoints] = useState(user.account.level_points)
  const [pointsToRender, setPointsToRender] = useState(0)
  const [isNextLevel, setIsNextLevel] = useState(false)
  const [isPreviousLevel, setIsPreviousLevel] = useState(false)

  useEffect(() => {
    //acrescenta ao level do usuario +1
    if (isNextLevel) {
      setTimeout(() => {
        setNextLevelValue(nextLevelValue + 1)
        setUserLevel(userLevel + 1)
      }, 1500)
    }
  }, [isNextLevel])

  useEffect(() => {
    //decrementa do level do usuario -1
    if (isPreviousLevel) {
      setTimeout(() => {
        setNextLevelValue(nextLevelValue - 1)
        setUserLevel(userLevel - 1)
      }, 1500)
    }
  }, [isPreviousLevel])

  useEffect(() => {
    if (userPoints + earnedPoints >= 100) {
      const pointsDiffTo100 = 100 - userPoints

      setPointsToRender(pointsDiffTo100)

      setIsPreviousLevel(false)
      setIsNextLevel(true)

      setTimeout(() => {
        setUserPoints(0)
        setPointsToRender(0)

        if (userPoints + earnedPoints === 100) return

        setTimeout(() => {
          setPointsToRender((earnedPoints - pointsDiffTo100) % 100)
        }, 100)
      }, 1500)
    } else if (userPoints + earnedPoints < 0) {
      setPointsToRender(userPoints * -1)

      if (userLevel > 0) {
        setIsPreviousLevel(true)
        setIsNextLevel(false)

        setTimeout(() => {
          setUserPoints(100)
          setPointsToRender(0)

          if (userPoints + earnedPoints === -1) return

          setTimeout(() => {
            setPointsToRender(earnedPoints + userPoints)
          }, 100)
        }, 1500)
      }
    } else {
      setPointsToRender(earnedPoints)
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
                {/* verificações para calcular o espaço necessário nas laterais do texto
                    right ou left para que as imagens de level não cubram o texto de
                    quantidade de pontos
                */}
                <Text
                  className={style.points}
                  right={
                    userLevel >= 30 // a imagem quando o level é maior ou igual a 30 ocupa mais espaço
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
