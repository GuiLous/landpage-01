import { Avatar, AvatarBadge, Link, Text, Tooltip } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

import { Container } from '@components'

export default function SidebarAvatarLink({ user }) {
  return (
    <Tooltip label="Meu perfil" aria-label="profile" placement="top-start">
      <Link
        as={RouterLink}
        to={`/perfil/${user.id}`}
        gap={{ base: '14px', md: '12px', '2xl': '14px' }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="full"
      >
        <Avatar
          src={user.account.avatar.medium}
          variant={user.status}
          size={{ base: 'md', md: 'smd', '2xl': 'md' }}
        >
          <AvatarBadge borderColor="gray.1100" />
        </Avatar>
        <Container column>
          <Text
            color="white"
            fontWeight="medium"
            fontSize={{ base: 14, md: 12, '2xl': 14 }}
          >
            {user.account.username}
          </Text>

          <Text
            color="purple.300"
            fontWeight="medium"
            fontSize={{ base: 12, md: 10, '2xl': 12 }}
          >
            Level {user.account.level}
          </Text>
        </Container>
      </Link>
    </Tooltip>
  )
}
