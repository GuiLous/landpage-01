import { useEffect, useState } from 'react'

import { formatSecondsToMinutes } from '@utils'

export default function Timer({
  initialTime,
  stop,
  reverse,
  formatted = true,
}) {
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

    const interval =
      !stop &&
      setInterval(() => {
        if (reverse) {
          if (elapsed > 0) setElapsed(elapsed - 1)
          else clearInterval(interval)
        } else setElapsed(elapsed + 1)
      }, 1000)

    return () => clearInterval(interval)
  })

  const render = () => {
    if (!formatted) return elapsed

    let timer = elapsed

    return formatSecondsToMinutes(timer)
  }

  return render()
}
