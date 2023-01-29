import { useEffect, useState } from 'react'

export default function Timer({ initialTime }) {
  const [elapsed, setElapsed] = useState(initialTime)

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(elapsed + 1)
    }, 1000)

    return () => clearInterval(interval)
  })

  const render = () => {
    let timer = elapsed
    if (timer > 3600) return new Date(timer * 1000).toISOString().substr(11, 8)
    else return (timer - (timer %= 60)) / 60 + (9 < timer ? ':' : ':0') + timer
  }

  return render()
}
