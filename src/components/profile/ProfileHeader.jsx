import { Avatar, Progress, Text } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { NavLink as RouterLink } from 'react-router-dom'

import { Container } from '@components'

import style from './ProfileHeader.module.css'

export default function ProfileHeader({ profile, hideNav }) {
  return (
    <Container
      align="end"
      gap={100}
      justify="between"
      className={style.container}
    >
      <Container gap={16} align="center" className={style.info}>
        <Container fitContent>
          <Avatar src={profile.avatar.large} size="xl" variant="white" />
        </Container>

        <Container column gap={18}>
          <Container column>
            <Text fontSize={20} fontWeight="bold" color="white">
              {profile.username}
            </Text>

            <Container gap={5}>
              <Text fontSize={14} color="white">
                Membro desde
              </Text>
              <Text fontSize={14} color="white" fontWeight="bold">
                {DateTime.fromISO(profile.date_joined).toLocaleString({
                  month: 'long',
                  year: 'numeric',
                })}
              </Text>
            </Container>
          </Container>

          <Container column gap={6}>
            <Progress h="9px" w="100%" value={profile.level_points} />

            <Container justify="between">
              <Text fontSize={12} color="white" textTransform="uppercase">
                Pontos de nível
              </Text>
              <Text fontSize={12} color="white">
                {profile.level_points}/100
              </Text>
            </Container>
          </Container>
        </Container>
      </Container>

      {!hideNav && (
        <Container gap={32} fitContent>
          <Container>
            <RouterLink
              to={`/perfil/${profile.user_id}`}
              className={({ isActive }) =>
                [style.link, isActive && style.active].join(' ')
              }
            >
              Perfil
            </RouterLink>
          </Container>

          <Container>
            <RouterLink
              to={`/conta`}
              className={({ isActive }) =>
                [style.link, isActive && style.active].join(' ')
              }
            >
              Conta
            </RouterLink>
          </Container>
        </Container>
      )}
    </Container>
  )
}
