import { useEffect, useState } from 'react'

import { StorageService } from '@services'

const usePersistentTimer = (initialTime, timerName, isLoading = false) => {
  const getRemainingTime = () => {
    if (isLoading) return null

    const expiryTime = StorageService.load(timerName)
    const currentTime = Math.floor(Date.now() / 1000)

    if (expiryTime) {
      return expiryTime - currentTime > 0 ? expiryTime - currentTime : 0
    }

    return initialTime
  }

  const [timeLeft, setTimeLeft] = useState(getRemainingTime())

  useEffect(() => {
    if (isLoading) return

    if (timeLeft === initialTime) {
      const currentTime = Math.floor(Date.now() / 1000)
      StorageService.save(timerName, currentTime + initialTime)
    }

    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timerId)
    }

    if (timeLeft === 0) {
      StorageService.remove(timerName)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, initialTime])

  return timeLeft
}

export default usePersistentTimer
