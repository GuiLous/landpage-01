import { useEffect, useState } from 'react'

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
    if (timer > 3600) return new Date(timer * 1000).toISOString().substr(11, 8)
    else return (timer - (timer %= 60)) / 60 + (9 < timer ? ':' : ':0') + timer
  }

  return render()
}
