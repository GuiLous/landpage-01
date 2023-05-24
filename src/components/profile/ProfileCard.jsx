import { Container } from '@components'

import { Text } from '@chakra-ui/react'
import style from './ProfileCard.module.css'

export default function ProfileCard({ title, children }) {
  return (
    <Container className={style.container} column gap={35}>
      {title && (
        <Container className={style.title}>
          <Text fontWeight="bold" data-testid="title">
            {title}
          </Text>
        </Container>
      )}
      <Container className={style.content}>{children}</Container>
    </Container>
  )
}
