import { Avatar, Badge, Progress, Text } from '@chakra-ui/react'

import {
  Container,
  ProfileHeaderButtons,
  ProfileHeaderSocialButtons,
} from '@components'
import { useHumanizeStatus } from '@hooks'

import style from './ProfileHeader.module.css'

export default function ProfileHeader({ profile, isUserLogged }) {
  let humanStatus = useHumanizeStatus(profile.status)

  humanStatus += profile?.status === 'in_game' ? ' (RANKED 5X5)' : ''

  return (
    <Container
      align="end"
      gap={100}
      justify="between"
      className={style.container}
    >
      <Container gap={16} align="center" className={style.info}>
        <Container fitContent>
          <Avatar src={profile.avatar.large} size="xxl" variant="white" />
        </Container>

        <Container column gap={14}>
          <Container column>
            <Container align="center" gap={14} fitContent>
              <Text fontSize={20} fontWeight="bold" color="white">
                {profile.username}
              </Text>
              <Container align="center" gap={8}>
                <Badge variant={profile.status} />
                <Text lineHeight={1} color="white" fontSize={14}>
                  {humanStatus}
                </Text>
              </Container>
            </Container>
          </Container>

          <Container column gap={8}>
            <Progress h="9px" w="100%" value={profile.level_points} />

            <Container justify="between">
              <Text fontSize={14} color="white" fontWeight="medium">
                Level {profile.level}
              </Text>
              <Text fontSize={14} fontWeight="medium" color="white">
                {profile.level_points}/100
              </Text>
            </Container>
          </Container>

          <ProfileHeaderSocialButtons
            socials={profile.social_handles || []}
            isUserLogged={isUserLogged}
          />
        </Container>
      </Container>

      <ProfileHeaderButtons
        isUserLogged={isUserLogged}
        username={profile.username}
      />
    </Container>
  )
}
