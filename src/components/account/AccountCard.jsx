import { Icon, Text } from '@chakra-ui/react'

import { Container } from '@components'

import style from './AccountCard.module.css'

export default function AccountCard({ title, description, children, icon }) {
  return (
    <Container gap={32} className={style.container} column>
      {title && (
        <Container className={style.title} gap={12}>
          <Container align="center" gap={12}>
            {icon && <Icon as={icon} fontSize={18} fill="white" />}
            <Text
              fontWeight="semiBold"
              fontSize={16}
              lineHeight={1}
              color="white"
              textTransform="uppercase"
              data-testid="title"
            >
              {title}
            </Text>
          </Container>
          {description && (
            <Text fontSize={16} color="gray.300" as="p">
              {description}
            </Text>
          )}
        </Container>
      )}
      <Container align="end">{children}</Container>
    </Container>
  )
}
