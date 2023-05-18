import { easings, useTransition } from '@react-spring/web'
import { useSelector } from 'react-redux'

import { Container, ToastListItem } from '@components'

export default function ToastList() {
  const toasts = useSelector((state) => state.toasts)
  const transitions = useTransition(toasts, {
    from: { opacity: 0, left: -50 },
    enter: { opacity: 1, left: 0 },
    leave: { opacity: 0, left: -50 },
    config: { duration: 200, easing: easings.easeOutCubic },
  })

  return (
    <Container reverseColumn gap={20}>
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
