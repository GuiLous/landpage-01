import { Icon, Text, useMediaQuery } from '@chakra-ui/react'

import { Container } from '@components'

import style from './AccountCard.module.css'

export default function AccountCard({ title, description, children, icon }) {
  const [isLessThan2xl] = useMediaQuery('(max-width: 1600px)')

  return (
    <Container gap={isLessThan2xl ? 28 : 32} className={style.container} column>
      {title && (
        <Container className={style.title} gap={12}>
          <Container align="center" gap={12}>
            {icon && (
              <Icon
                as={icon}
                fontSize={{ base: 18, md: 16, '2xl': 18 }}
                fill="white"
              />
            )}
            <Text
              fontWeight="semiBold"
              fontSize={{ base: 16, md: 14, '2xl': 16 }}
              lineHeight={1}
              color="white"
              textTransform="uppercase"
              data-testid="title"
            >
              {title}
            </Text>
          </Container>
          {description && (
            <Text
              fontSize={{ base: 16, md: 14, '2xl': 16 }}
              color="gray.300"
              as="p"
            >
              {description}
            </Text>
          )}
        </Container>
      )}
      <Container align="end">{children}</Container>
    </Container>
  )
}
