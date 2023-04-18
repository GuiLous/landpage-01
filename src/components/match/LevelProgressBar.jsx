/* eslint-disable react-hooks/exhaustive-deps */
import { Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import { useSelector } from 'react-redux'

import { Container, LevelBadge } from '@components'

import style from './LevelProgressBar.module.css'

export default function LevelProgressBar({ earnedPoints = -10 }) {
  const user = useSelector((state) => state.user)

  const [userLevel, setUserLevel] = useState(0)
  const [nextLevelValue, setNextLevelValue] = useState(1)
  const [userPoints, setUserPoints] = useState(90)
  const [totalEarnedPoints, setTotalEarnedPoints] = useState(0)
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
    const pointsDiffTo100 = 100 - userPoints

    if (userPoints + earnedPoints >= 100) {
      setTotalEarnedPoints(pointsDiffTo100)

      setIsPreviousLevel(false)
      setIsNextLevel(true)

      setTimeout(() => {
        setUserPoints(0)
        setTotalEarnedPoints(0)

        if (earnedPoints + userPoints === 100) return

        setTimeout(() => {
          setTotalEarnedPoints((earnedPoints - pointsDiffTo100) % 100)
        }, 100)
      }, 1500)
    } else if (false) {
      console.log('aqui falso')
    } else {
      setTotalEarnedPoints(earnedPoints)
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

      <Container column gap={4} style={{ marginTop: '22px' }}>
        <Container
          className={style.progressBackGround}
          style={{ position: earnedPoints < 0 ? 'relative' : 'initial' }}
        >
          <Container
            className={
              earnedPoints < 0
                ? `${style.initialProgress} ${style.transition}`
                : style.initialProgress
            }
            style={{
              width:
                Number(totalEarnedPoints) < 0
                  ? `${userPoints + Number(totalEarnedPoints)}%`
                  : `${userPoints}%`,
              position: earnedPoints < 0 ? 'absolute' : 'relative',
            }}
          >
            {Number(totalEarnedPoints) < 0 && (
              <Text className={style.points} right={-12}>
                <CountUp
                  end={Number(totalEarnedPoints)}
                  prefix={Number(totalEarnedPoints) >= 0 ? '+' : ''}
                />
                pts
              </Text>
            )}
          </Container>

          {Number(totalEarnedPoints) < 0 ? (
            <Container
              className={style.progressDown}
              style={{ width: `${Math.abs(userPoints)}%` }}
            ></Container>
          ) : (
            <Container
              style={{
                maxWidth: `${Math.abs(totalEarnedPoints)}%`,
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
                      ? Number(totalEarnedPoints) <= 4
                        ? Number(totalEarnedPoints) + userPoints >= 98
                          ? '10px'
                          : '-38px'
                        : Number(totalEarnedPoints) + userPoints >= 98
                        ? '10px'
                        : '6px'
                      : Number(totalEarnedPoints) <= 3
                      ? userPoints + Number(totalEarnedPoints) >= 98
                        ? '6px'
                        : '-30px'
                      : '6px'
                  }
                >
                  <CountUp
                    end={Number(totalEarnedPoints)}
                    prefix={Number(totalEarnedPoints) >= 0 ? '+' : ''}
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
