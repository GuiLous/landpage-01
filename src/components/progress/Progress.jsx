import { Text } from '@chakra-ui/react'
import { useSpring } from '@react-spring/web'
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'

import { Container } from '@components'

import style from './Progress.module.css'

export default function Progress({
  value,
  initial,
  overflow = true,
  showLabel = true,
  radius = true,
  horizontalPadding = 0,
  labelSuffix = 'pts',
  labelSize = '12px',
  labelGap = 5,
  changeInitialBg = false,
}) {
  const [progress, setProgress] = useState(0)
  const [overflowed, setOverflowed] = useState(false)
  const [hideNonOverflowedLabel, setHideNonOverflowedLabel] = useState(false)
  const min = 0
  const max = 100

  useEffect(() => {
    if (initial + value > max) {
      setProgress(max - initial)
      overflow ? setOverflowed(true) : setOverflowed(false)
    } else if (initial + value < min) {
      setProgress(initial)
      overflow ? setOverflowed(true) : setOverflowed(false)
    } else {
      setProgress(value)
      setOverflowed(false)
    }
  }, [max, min, initial, value, overflow])

  const isPositive = value > 0
  const labelPrefix = isPositive && '+'
  const animationWidthFrom = 0

  const valueBarAnimation = useSpring({
    from: { width: `${animationWidthFrom}%` },
    to: {
      width:
        value === 0
          ? '0%'
          : animationWidthFrom === progress
          ? `${Math.abs(progress + 1)}%`
          : `${Math.abs(progress)}%`,
    },
    config: { duration: 600 },
    onRest: () => {
      if (overflowed) setHideNonOverflowedLabel(true)
    },
  })

  const valueBarOverflowedAnimation = useSpring({
    from: { width: `${animationWidthFrom}%` },
    to: {
      width: `(${
        isPositive
          ? Math.abs(initial + value - max)
          : Math.abs(max - (initial + value + max))
      }%`,
    },
    config: { duration: 600 },
    delay: 600,
  })

  return (
    <Container className={style.container}>
      <Container className={style.bars}>
        {overflowed && (
          <Container
            className={style.barWrapper}
            column
            gap={labelGap}
            style={{
              left: isPositive && '0%',
              right: !isPositive && '0%',
              ...valueBarOverflowedAnimation,
            }}
          >
            {showLabel && (
              <Container
                className={style.label}
                justify={isPositive ? 'end' : 'start'}
                style={{
                  visibility: !hideNonOverflowedLabel && 'hidden',
                  position: 'relative',
                  right:
                    !isPositive &&
                    Math.abs(value) - initial < 3 &&
                    32 + horizontalPadding,
                  left:
                    isPositive &&
                    initial + value < 103 &&
                    27 + horizontalPadding,
                }}
              >
                <Text fontSize={labelSize || '12px'}>
                  {labelPrefix}
                  <CountUp start={0} end={value} /> {labelSuffix}
                </Text>
              </Container>
            )}

            <Container
              className={[
                style.valueOverflowedBar,
                style.bar,
                !isPositive && style.danger,
              ].join(' ')}
              style={{ borderRadius: radius && 4 }}
            ></Container>
          </Container>
        )}

        <Container
          className={style.barWrapper}
          column
          gap={labelGap}
          style={{
            left: isPositive && `${initial}%`,
            right: !isPositive && `${max - initial}%`,
            ...valueBarAnimation,
          }}
        >
          {showLabel && (
            <Container
              className={style.label}
              justify={isPositive ? 'end' : 'start'}
              style={{
                visibility: hideNonOverflowedLabel && 'hidden',
                position: 'relative',
                paddingLeft:
                  initial + value === min || initial + value === max
                    ? 0 + horizontalPadding
                    : horizontalPadding,
                paddingRight:
                  initial + value === min || initial + value === max
                    ? 0 + horizontalPadding
                    : horizontalPadding,
              }}
            >
              <Text fontSize={labelSize || '12px'}>
                {labelPrefix}
                <CountUp start={0} end={value} /> {labelSuffix}
              </Text>
            </Container>
          )}

          <Container
            className={[
              style.valueBar,
              style.bar,
              !isPositive && style.danger,
            ].join(' ')}
            style={{
              borderBottomRightRadius: radius && 4,
              borderTopRightRadius: radius && 4,
              borderBottomLeftRadius: radius && !isPositive && 4,
              borderTopLeftRadius: radius && !isPositive && 4,
            }}
          ></Container>
        </Container>

        <Container
          className={style.barWrapper}
          column
          gap={labelGap}
          style={{ width: `${initial}%` }}
        >
          {showLabel && (
            <Container className={style.label}>
              <Text fontSize={labelSize || '12px'} visibility={'hidden'}>
                {initial} {labelSuffix}
              </Text>
            </Container>
          )}

          <Container
            className={[style.initialBar, style.bar].join(' ')}
            style={{
              borderBottomLeftRadius: radius && 4,
              borderTopLeftRadius: radius && 4,
              borderBottomRightRadius: !isPositive && radius && 4,
              borderTopRightRadius: !isPositive && radius && 4,
            }}
          ></Container>
        </Container>

        <Container className={style.barWrapper} column gap={labelGap}>
          {showLabel && (
            <Container className={style.label}>
              <Text fontSize={labelSize || '12px'} visibility={'hidden'}>
                {min} {labelSuffix}
              </Text>
            </Container>
          )}

          <Container
            className={[
              style.backgroundBar,
              style.bar,
              initial + value < 0 &&
                changeInitialBg &&
                style.backgroundBarNegative,
            ].join(' ')}
            style={{ borderRadius: radius && 4 }}
          ></Container>
        </Container>
      </Container>
    </Container>
  )
}
