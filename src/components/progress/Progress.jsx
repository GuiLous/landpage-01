import { Text } from '@chakra-ui/react'
import { useSpring } from '@react-spring/web'
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'

import { Container } from '@components'

import style from './Progress.module.css'

export default function Progress({
  value,
  initial,
  overflow,
  showLabel,
  radius,
  horizontalPadding = 0,
  labelSuffix,
  labelSize = '14px',
  labelGap = 5,
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

  const valueBarAnimation = useSpring({
    from: { width: '0%' },
    to: { width: `${Math.abs(progress)}%` },
    config: { duration: 600 },
    onRest: () => {
      if (overflowed) setHideNonOverflowedLabel(true)
    },
  })

  const valueBarOverflowedAnimation = useSpring({
    from: { width: '0%' },
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
                    overflowed &&
                    Math.abs(value) - initial < 3 &&
                    30,
                  left: isPositive && overflowed && initial + value < 103 && 30,
                }}
              >
                <Text fontSize={labelSize || '14px'}>
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
                paddingLeft:
                  (initial + value === min || initial + value === max) &&
                  horizontalPadding,
                paddingRight:
                  (initial + value === min || initial + value === max) &&
                  horizontalPadding,
              }}
            >
              <Text fontSize={labelSize || '14px'}>
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
              <Text fontSize={labelSize || '14px'} visibility={'hidden'}>
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
              <Text fontSize={labelSize || '14px'} visibility={'hidden'}>
                {min} {labelSuffix}
              </Text>
            </Container>
          )}

          <Container
            className={[style.backgroundBar, style.bar].join(' ')}
            style={{ borderRadius: radius && 4 }}
          ></Container>
        </Container>
      </Container>
    </Container>
  )
}
