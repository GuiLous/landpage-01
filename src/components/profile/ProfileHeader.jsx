import { Avatar, Progress, Text } from '@chakra-ui/react'

import { Container } from '@components'

export default function ProfileHeader({ account }) {
  return (
    <Container align="center" gap={32} justify="between">
      <Container gap={16} align="center">
        <Container fitContent>
          <Avatar src={account.avatar.medium} size="xl" />
        </Container>

        <Container column gap={14}>
          <Text fontSize={20} fontWeight="bold" color="white">
            {account.username}
          </Text>

          <Container column gap={6}>
            <Progress h="9px" w="100%" value={account.level_points} />

            <Container justify="between">
              <Text fontSize={12} color="gray.700" textTransform="uppercase">
                Pontos de nível
              </Text>
              <Text fontSize={12} color="gray.700">
                {account.level_points}/100
              </Text>
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  )
}
