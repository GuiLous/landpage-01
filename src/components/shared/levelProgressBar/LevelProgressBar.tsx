'use client'

import { animated as a, useSpring } from '@react-spring/web'
import { useState } from 'react'
import CountUp from 'react-countup'
import { useMediaQuery } from 'react-responsive'
import { twMerge } from 'tailwind-merge'

import { LevelBadge } from '@/components/shared'

import { Progress } from './Progress'

interface LevelProgressBarProps {
  points_earned: number
  level_points_before: number
  level_points_after: number
  level_before: number
  level_after: number
}

export function LevelProgressBar({
  points_earned,
  level_points_before,
  level_points_after,
  level_before,
  level_after,
}: LevelProgressBarProps) {
  const isUltrawide = useMediaQuery({
    query: '(min-width: 2560px)',
  })

  const [levelUpdateReady, setLevelUpdateReady] = useState(false)

  const levelChange = level_before !== level_after

  const levelAnimation = useSpring({
    from: { transform: 'scale(1)' },
    to: async (next) => {
      if (levelChange) await next({ transform: 'scale(1.4)', reverse: true })
    },
    config: { duration: 200 },
    delay: 550,
    onRest: () => {
      setLevelUpdateReady(true)
    },
  })

  const showRightRadius =
    level_points_before + points_earned >= 100 || level_points_before >= 100
  const showLeftRadius =
    level_points_before + points_earned <= 0 || level_points_before <= 0

  return (
    <div className="relative items-end gap-1">
      <a.div
        className="relative z-40 max-w-fit flex-initial"
        style={{ ...levelAnimation }}
      >
        <LevelBadge
          variant={isUltrawide ? 'smd' : 'sm'}
          level={levelUpdateReady ? level_after : level_before}
        />
      </a.div>

      <div className="flex-col gap-1.5">
        <div>
          <Progress
            initial={level_points_before}
            value={points_earned}
            horizontalPadding={
              level_points_before < 7 && points_earned < 10 && points_earned > 0
                ? 37
                : 0
            }
            changeInitialBg={levelUpdateReady}
            rightRadius={showRightRadius}
            leftRadius={showLeftRadius}
          />
        </div>

        <div className="justify-between">
          <div>
            <span className={twMerge('text-xs uppercase', 'ultrawide:text-xl')}>
              Level {level_after}
            </span>
          </div>

          <div className="justify-end">
            <span
              className={twMerge(
                'text-xs font-medium text-white',
                'ultrawide:text-xl'
              )}
            >
              <CountUp start={level_points_before} end={level_points_after} />
            </span>

            <span
              className={twMerge('text-xs text-white', 'ultrawide:text-xl')}
            >
              /100
            </span>
          </div>
        </div>
      </div>

      <a.div
        className="relative z-40 max-w-fit flex-initial"
        style={{ ...levelAnimation }}
      >
        <LevelBadge
          variant={isUltrawide ? 'smd' : 'sm'}
          level={levelUpdateReady ? level_after + 1 : level_before + 1}
        />
      </a.div>
    </div>
  )
}
