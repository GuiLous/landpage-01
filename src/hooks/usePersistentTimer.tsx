'use client'

import { useEffect, useState } from 'react'

import { storageService } from '@/services'

export const usePersistentTimer = (
  initialTime: number,
  timerName: string,
  isLoading: boolean
) => {
  const getRemainingTime = () => {
    if (typeof window !== 'undefined') {
      const expiryTime = storageService.load(timerName)
      const currentTime = Math.floor(Date.now() / 1000)

      if (expiryTime) {
        return expiryTime - currentTime > 0 ? expiryTime - currentTime : 0
      }

      return initialTime
    }
  }

  const [timeLeft, setTimeLeft] = useState(getRemainingTime())

  useEffect(() => {
    if (isLoading || timeLeft === undefined) return

    if (timeLeft === initialTime) {
      const currentTime = Math.floor(Date.now() / 1000)
      storageService.save(timerName, currentTime + initialTime)
    }

    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timerId)
    }

    if (timeLeft === 0) {
      storageService.remove(timerName)
    }
  }, [timeLeft, initialTime, isLoading, timerName])

  useEffect(() => {
    if (timeLeft === null && initialTime > 0) {
      setTimeLeft(initialTime)
    }
  }, [timeLeft, initialTime])

  return timeLeft
}
