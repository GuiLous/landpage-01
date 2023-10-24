'use client'

import { useEffect, useState } from 'react'

import { formatSecondsToMinutes } from '@/utils'

interface TimerProps {
  initialTime: number
  stop?: boolean
  reverse?: boolean
  formatted?: boolean
}

export function Timer({
  initialTime,
  stop = false,
  reverse = false,
  formatted = true,
}: TimerProps) {
  const [elapsed, setElapsed] = useState(initialTime)

  useEffect(() => {
    if (reverse && !initialTime) {
      throw Object.assign(
        new Error(
          'An initial time is required for a reverse timer (countdown).'
        ),
        { code: 400 }
      )
    }

    const interval = stop
      ? undefined
      : setInterval(() => {
          if (reverse) {
            if (elapsed > 0) setElapsed(elapsed - 1)
            else clearInterval(interval)
          } else setElapsed(elapsed + 1)
        }, 1000)

    return () => clearInterval(interval)
  })

  const render = () => {
    if (!formatted) return elapsed

    const timer = elapsed

    return formatSecondsToMinutes(timer)
  }

  return render()
}
