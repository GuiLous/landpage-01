import { Text } from '@chakra-ui/react'

import { Container } from '@components'

import style from './AccountCard.module.css'

export default function AccountCard({ title, description, children }) {
  return (
    <Container className={style.container} column>
      {title && (
        <Container className={style.title} gap={12}>
          <Text
            fontWeight="bold"
            fontSize={18}
            lineHeight={1}
            color="white"
            textTransform="uppercase"
            data-testid="title"
          >
            {title}
          </Text>
          {description && (
            <Text fontSize={16} color="gray.300" as="p">
              {description}
            </Text>
          )}
        </Container>
      )}
      <Container>{children}</Container>
    </Container>
  )
}
