import { useEffect, useState } from 'react'

import { StorageService } from '@services'

const usePersistentTimer = (initialTime) => {
  const getRemainingTime = () => {
    const expiryTime = StorageService.load('expiryTime')
    const currentTime = Math.floor(Date.now() / 1000)

    if (expiryTime) {
      return expiryTime - currentTime > 0 ? expiryTime - currentTime : 0
    }

    return initialTime
  }

  const [timeLeft, setTimeLeft] = useState(getRemainingTime())

  useEffect(() => {
    if (timeLeft === initialTime) {
      const currentTime = Math.floor(Date.now() / 1000)
      StorageService.save('expiryTime', currentTime + initialTime)
    }

    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timerId)
    }

    if (timeLeft === 0) {
      StorageService.remove('expiryTime')
    }
  }, [timeLeft, initialTime])

  return timeLeft
}

export default usePersistentTimer
