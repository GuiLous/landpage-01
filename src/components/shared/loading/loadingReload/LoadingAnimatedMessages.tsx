'use client'

import { animated as a, useTransition } from '@react-spring/web'
import { useEffect, useState } from 'react'

interface LoadingAnimatedMessagesProps {
  textsArray: string[]
  intervalTime?: number
}

export function LoadingAnimatedMessages({
  intervalTime = 3000,
  textsArray = [],
}: LoadingAnimatedMessagesProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  const transitions = useTransition(textsArray[currentTextIndex], {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    config: { duration: 300 },
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textsArray.length)
    }, intervalTime)

    return () => clearInterval(interval)
  }, [textsArray, intervalTime])

  return transitions((style, item) => (
    <a.div
      className="flex-initial items-center justify-center"
      style={{ ...style }}
    >
      <p key={item} className="text-lg font-medium text-white">
        {item}
      </p>
    </a.div>
  ))
}
