'use client'

import { animated as a, useSpring } from '@react-spring/web'
import { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import { twMerge } from 'tailwind-merge'

import { MAX_PROGRESS, MIN_PROGRESS } from '@/constants'

interface ProgressProps {
  value: number
  initial: number
  overflow?: boolean
  showLabel?: boolean
  radius?: boolean
  rightRadius?: boolean
  leftRadius?: boolean
  horizontalPadding?: number
  labelSuffix?: string
  labelSize?: string
  labelGap?: number
  changeInitialBg?: boolean
}

export function Progress({
  value,
  initial,
  overflow = true,
  showLabel = true,
  radius = true,
  rightRadius = true,
  leftRadius = true,
  horizontalPadding = 0,
  labelSuffix = 'pts',
  labelSize = '12px',
  labelGap = 5,
  changeInitialBg = false,
}: ProgressProps) {
  const [progress, setProgress] = useState(0)
  const [overflowed, setOverflowed] = useState(false)
  const [hideNonOverflowedLabel, setHideNonOverflowedLabel] = useState(false)

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
          ? Math.abs(initial + value - MAX_PROGRESS)
          : Math.abs(MAX_PROGRESS - (initial + value + MAX_PROGRESS))
      }%`,
    },
    config: { duration: 600 },
    delay: 600,
  })

  useEffect(() => {
    if (initial + value > MAX_PROGRESS) {
      setProgress(MAX_PROGRESS - initial)
      overflow ? setOverflowed(true) : setOverflowed(false)
    } else if (initial + value < MIN_PROGRESS) {
      setProgress(initial)
      overflow ? setOverflowed(true) : setOverflowed(false)
    } else {
      setProgress(value)
      setOverflowed(false)
    }
  }, [initial, value, overflow])

  return (
    <div className="relative min-h-[32px] overflow-x-hidden">
      <div className="relative">
        {overflowed && (
          <a.div
            className={twMerge(
              'absolute flex-col',
              isPositive && 'left-[0%]',
              !isPositive && 'right-[0%]'
            )}
            style={{
              gap: labelGap + 'px',
              ...valueBarOverflowedAnimation,
            }}
          >
            {showLabel && (
              <div
                className={twMerge(
                  'justify-start relative whitespace-nowrap',
                  isPositive && 'justify-end'
                )}
                style={{
                  visibility:
                    value === null || !hideNonOverflowedLabel
                      ? 'hidden'
                      : undefined,
                  right:
                    !isPositive && Math.abs(value) - initial < 3
                      ? 32 + horizontalPadding
                      : undefined,
                  left:
                    isPositive && initial + value < 103
                      ? 27 + horizontalPadding
                      : undefined,
                }}
              >
                <span style={{ fontSize: labelSize || '12px' }}>
                  {labelPrefix}
                  <CountUp start={0} end={value} /> {labelSuffix}
                </span>
              </div>
            )}

            <div
              className={twMerge(
                'rounded-lg max-h-1.5 min-h-[6px] overflow-hidden relative bg-green-400 z-30',
                !isPositive && 'bg-red-500'
              )}
              style={{ borderRadius: radius ? 8 : undefined }}
            />
          </a.div>
        )}

        <a.div
          className="absolute flex-col"
          style={{
            left: isPositive ? `${initial}%` : undefined,
            right: !isPositive ? `${MAX_PROGRESS - initial}%` : undefined,
            gap: labelGap + 'px',
            ...valueBarAnimation,
          }}
        >
          {showLabel && (
            <div
              className={twMerge(
                'justify-start relative whitespace-nowrap',
                isPositive && 'justify-end'
              )}
              style={{
                visibility:
                  value === null || hideNonOverflowedLabel
                    ? 'hidden'
                    : undefined,
                paddingLeft:
                  initial + value === MIN_PROGRESS ||
                  initial + value === MAX_PROGRESS
                    ? 0 + horizontalPadding
                    : horizontalPadding,
                paddingRight:
                  initial + value === MIN_PROGRESS ||
                  initial + value === MAX_PROGRESS
                    ? 0 + horizontalPadding
                    : horizontalPadding,
              }}
            >
              <span style={{ fontSize: labelSize || '12px' }}>
                {labelPrefix}
                <CountUp start={0} end={value} /> {labelSuffix}
              </span>
            </div>
          )}

          <div
            className={twMerge(
              'rounded-lg max-h-1.5 min-h-[6px] overflow-hidden relative bg-green-400 z-30',
              !isPositive && 'bg-red-500'
            )}
            style={{
              borderBottomRightRadius: rightRadius ? 8 : 0,
              borderTopRightRadius: rightRadius ? 8 : 0,
              borderBottomLeftRadius: leftRadius ? 8 : 0,
              borderTopLeftRadius: leftRadius ? 8 : 0,
            }}
          />
        </a.div>

        <div
          className="absolute flex-col"
          style={{
            gap: labelGap + 'px',
            width:
              (value > 0 && value + initial <= 100) ||
              (value > 0 && initial < 100)
                ? `${initial + 1}%`
                : `${initial}%`,
          }}
        >
          {showLabel && (
            <div className="whitespace-nowrap">
              <span
                className="invisible"
                style={{ fontSize: labelSize || '12px' }}
              >
                {initial} {labelSuffix}
              </span>
            </div>
          )}

          <div
            className="relative z-10 max-h-1.5 min-h-[6px] overflow-hidden rounded-lg bg-purple-300"
            style={{
              borderBottomLeftRadius: radius ? 8 : 0,
              borderTopLeftRadius: radius ? 8 : 0,
              borderBottomRightRadius: radius ? 8 : 0,
              borderTopRightRadius: radius ? 8 : 0,
            }}
          />
        </div>

        <div className="absolute flex-col" style={{ gap: labelGap + 'px' }}>
          {showLabel && (
            <div className="whitespace-nowrap">
              <span
                className="invisible"
                style={{ fontSize: labelSize || '12px' }}
              >
                {MIN_PROGRESS} {labelSuffix}
              </span>
            </div>
          )}

          <div
            className={twMerge(
              'bg-white z-0 rounded-lg max-h-1.5 min-h-[6px] overflow-hidden relative',
              initial + value < 0 && changeInitialBg && 'bg-purple-300'
            )}
            style={{ borderRadius: radius ? 8 : undefined }}
          ></div>
        </div>
      </div>
    </div>
  )
}
