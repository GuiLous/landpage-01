'use client'

import { useCallback, useEffect, useState } from 'react'

interface CountdownClockProps {
  endTime: number
}

export function CountdownClock({ endTime }: CountdownClockProps) {
  const calculateTimeRemaining = useCallback(() => {
    const now = new Date().getTime()
    let difference = endTime - now

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }

    const timeUnits = [
      { unit: 'days', duration: 24 * 60 * 60 * 1000 },
      { unit: 'hours', duration: 60 * 60 * 1000 },
      { unit: 'minutes', duration: 60 * 1000 },
      { unit: 'seconds', duration: 1000 },
    ]

    const timeRemaining: any = {}

    timeUnits.forEach(({ unit, duration }) => {
      timeRemaining[unit] = Math.floor(difference / duration)
      difference %= duration
    })

    return timeRemaining
  }, [endTime])

  const [remainingTime, setRemainingTime] = useState(calculateTimeRemaining)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(calculateTimeRemaining())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [calculateTimeRemaining])

  const formatTime = (time: number) => time.toString().padStart(2, '0')

  const renderDays = () => remainingTime.days > 0 && `${remainingTime.days}D `

  return (
    <span>
      {renderDays()}
      {`${formatTime(remainingTime.hours)}:${formatTime(
        remainingTime.minutes
      )}:${formatTime(remainingTime.seconds)}`}
    </span>
  )
}
