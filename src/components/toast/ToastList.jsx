import { useTransition } from '@react-spring/web'
import { useSelector } from 'react-redux'

import { Container, ToastListItem } from '@components'

export default function ToastList() {
  const toasts = useSelector((state) => state.toasts)
  const transitions = useTransition(toasts, {
    from: { opacity: 0, left: -100 },
    enter: { opacity: 1, left: 0 },
    leave: { opacity: 0, left: -100 },
  })

  return (
    <Container column gap={20}>
      {transitions((style, item) => (
        <Container style={{ ...style, position: 'relative' }}>
          <ToastListItem {...item} />
        </Container>
      ))}
    </Container>
  )
}
