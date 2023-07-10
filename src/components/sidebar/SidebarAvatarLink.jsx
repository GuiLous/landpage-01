import { Avatar, Text } from '@chakra-ui/react'

import { Container } from '@components'

export default function SidebarAvatarLink({ user }) {
  return (
    <Container gap={14} align="center" justify="center">
      <Avatar src={user.account.avatar.medium} variant={user.status} />
      <Container column>
        <Text
          color="white"
          fontWeight={'medium'}
          fontSize={{ base: 16, md: 14, '2xl': 16 }}
        >
          {user.account.username}
        </Text>

        <Text
          color="gray.700"
          fontWeight={'medium'}
          fontSize={{ base: 12, md: 10, '2xl': 12 }}
        >
          LEVEL {user.account.level}
        </Text>
      </Container>
    </Container>
  )
}
