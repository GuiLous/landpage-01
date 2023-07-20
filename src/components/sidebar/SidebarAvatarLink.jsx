import { Avatar, AvatarBadge, Link, Text, Tooltip } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

import { Container } from '@components'

export default function SidebarAvatarLink({ user }) {
  return (
    <Tooltip label="Meu perfil" aria-label="profile" placement="top-start">
      <Link
        as={RouterLink}
        to={`/perfil/${user.id}`}
        gap="14px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="full"
      >
        <Avatar src={user.account.avatar.medium} variant={user.status}>
          <AvatarBadge borderColor="gray.1100" />
        </Avatar>
        <Container column>
          <Text
            color="white"
            fontWeight={'medium'}
            fontSize={{ base: 16, md: 14, '2xl': 16 }}
          >
            {user.account.username}
          </Text>

          <Text
            color="gray.300"
            fontWeight={'medium'}
            fontSize={{ base: 12, md: 10, '2xl': 12 }}
          >
            LEVEL {user.account.level}
          </Text>
        </Container>
      </Link>
    </Tooltip>
  )
}
