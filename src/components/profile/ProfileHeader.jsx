import { Avatar, Progress, Text } from '@chakra-ui/react'

import { Container } from '@components'

export default function ProfileHeader({ profile }) {
  return (
    <Container align="center" gap={100} justify="between">
      <Container gap={16} align="center">
        <Container fitContent>
          <Avatar src={profile.avatar.medium} size="xl" />
        </Container>

        <Container column gap={14}>
          <Text fontSize={20} fontWeight="bold" color="white">
            {profile.username}
          </Text>

          <Container column gap={6}>
            <Progress h="9px" w="100%" value={profile.level_points} />

            <Container justify="between">
              <Text fontSize={12} color="gray.700" textTransform="uppercase">
                Pontos de nível
              </Text>
              <Text fontSize={12} color="gray.700">
                {profile.level_points}/100
              </Text>
            </Container>
          </Container>
        </Container>
      </Container>

      <Container gap={40} fitContent>
        <Container column align="center" justify="center" fitContent>
          <Text fontSize={'14px'} fontWeight="medium" color="gray.700">
            Abates
          </Text>
          <Text fontSize={'20px'} fontWeight={'bold'}>
            {profile.stats.kills || 0}
          </Text>
        </Container>

        <Container column align="center" justify="center" fitContent>
          <Text fontSize={'14px'} fontWeight="medium" color="gray.700">
            Assistências
          </Text>
          <Text fontSize={'20px'} fontWeight={'bold'}>
            {profile.stats.assists || 0}
          </Text>
        </Container>

        <Container column align="center" justify="center" fitContent>
          <Text fontSize={'14px'} fontWeight="medium" color="gray.700">
            Headshots
          </Text>
          <Text fontSize={'20px'} fontWeight={'bold'}>
            {profile.stats.head_shots || 0}
          </Text>
        </Container>
      </Container>
    </Container>
  )
}
