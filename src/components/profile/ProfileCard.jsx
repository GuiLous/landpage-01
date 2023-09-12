import { Text, useMediaQuery } from '@chakra-ui/react'

import { Container } from '@components'

import style from './ProfileCard.module.css'

export default function ProfileCard({ title, children }) {
  const [isLessThan2xl] = useMediaQuery('(max-width: 1600px)')

  return (
    <Container className={style.container} column gap={isLessThan2xl ? 28 : 35}>
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
