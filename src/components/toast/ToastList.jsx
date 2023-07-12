import { theme } from '@chakra-ui/react'
import { easings, useTransition } from '@react-spring/web'
import { useSelector } from 'react-redux'

import { Container, ToastListItem } from '@components'

export default function ToastList() {
  const toasts = useSelector((state) => state.app.toasts)
  const transitions = useTransition(toasts, {
    from: { opacity: 0, right: -40 },
    enter: { opacity: 1, right: 0 },
    leave: { opacity: 0, right: -40 },
    config: { duration: 200, easing: easings.easeOutCubic },
  })

  return (
    <Container reverseColumn gap={20} style={{ zIndex: theme.zIndices.toast }}>
      {transitions((style, item) => (
        <Container
          style={{ ...style, position: 'relative' }}
          testID="toast-item"
        >
          <ToastListItem {...item} />
        </Container>
      ))}
    </Container>
  )
}
