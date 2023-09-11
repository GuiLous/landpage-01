import { Avatar, Badge, Progress, Text, useMediaQuery } from '@chakra-ui/react'

import {
  Container,
  ProfileHeaderButtons,
  ProfileHeaderSocialButtons,
} from '@components'
import { useHumanizeStatus } from '@hooks'

import style from './ProfileHeader.module.css'

export default function ProfileHeader({ profile, isUserLogged }) {
  const [isLessThan2xl] = useMediaQuery('(max-width: 1600px)')

  let humanStatus = useHumanizeStatus(profile.status)

  humanStatus += profile?.status === 'in_game' ? ' (RANKED 5X5)' : ''

  return (
    <Container
      align="end"
      gap={isLessThan2xl ? 20 : 100}
      justify="between"
      className={style.container}
    >
      <Container
        gap={isLessThan2xl ? 14 : 16}
        align="center"
        className={style.info}
      >
        <Container fitContent>
          <Avatar
            src={profile.avatar.large}
            size={{ base: 'xxl', md: 'xl', '2xl': 'xxl' }}
            variant="white"
          />
        </Container>

        <Container column gap={isLessThan2xl ? 8 : 10}>
          <Container column>
            <Container align="center" gap={14} fitContent>
              <Text
                fontSize={{ base: 20, md: 18, '2xl': 20 }}
                fontWeight="bold"
                color="white"
              >
                {profile.username}
              </Text>
              <Container align="center" gap={8}>
                <Badge
                  variant={profile.status}
                  w={{ base: '10px', md: '9px', '2xl': '10px' }}
                  h={{ base: '10px', md: '9px', '2xl': '10px' }}
                />
                <Text
                  lineHeight={1}
                  color="white"
                  fontSize={{ base: 14, md: 12, '2xl': 14 }}
                >
                  {humanStatus}
                </Text>
              </Container>
            </Container>
          </Container>

          <Container column gap={isLessThan2xl ? 6 : 8}>
            <Progress
              h={{ base: '9px', md: '8px', '2xl': '9px' }}
              w="100%"
              value={profile.level_points}
            />

            <Container justify="between">
              <Text
                fontSize={{ base: 14, md: 12, '2xl': 14 }}
                color="white"
                fontWeight="medium"
              >
                Level {profile.level}
              </Text>
              <Text
                fontSize={{ base: 14, md: 12, '2xl': 14 }}
                fontWeight="medium"
                color="white"
              >
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
