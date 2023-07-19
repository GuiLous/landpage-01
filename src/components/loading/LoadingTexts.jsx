import { useTransition } from '@react-spring/web'
import { useEffect, useState } from 'react'

import { Text } from '@chakra-ui/react'
import { Container } from '@components'

export default function LoadingTexts({ textsArray = [], intervalTime = 3000 }) {
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
    <Container fitContent align="center" justify="center" style={{ ...style }}>
      <Text key={item} fontSize={18} color="white" fontWeight="medium">
        {item}
      </Text>
    </Container>
  ))
}
