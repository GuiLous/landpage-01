import { Avatar, Progress, Text } from '@chakra-ui/react'
import React from 'react'

import { Container } from '@components'
import style from './HeaderProfile.module.css'

export default function HeaderProfile({ profile }) {
  return (
    <Container
      className={style.container}
      align="center"
      gap={32}
      justify="between"
    >
      <Container gap={16} align="center" className={style.profileWrapper}>
        <Container className={style.avatar} fitContent>
          <Avatar
            src={profile.avatar.medium}
            variant={profile.status}
            size="xl"
          />
        </Container>

        <Container className={style.userInfo} column gap={12}>
          <Container className={style.username}>
            <Text lineHeight={1}>{profile.username}</Text>
          </Container>

          <Container className={style.levelInfo} gap={4} column>
            <Container className={style.levelBar}>
              <Progress h={'8px'} value={profile.level_points} />
            </Container>

            <Container className={style.levelHelper} justify="between">
              <Text color="gray.700">Pontos de Nível</Text>
              <Text color="gray.700">{profile.level_points}/100</Text>
            </Container>
          </Container>
        </Container>
      </Container>

      <Container className={style.userStats} gap={40} fitContent>
        <Container column align="center" justify="center" fitContent>
          <Text fontSize={'14px'} fontWeight="medium" color="gray.700">
            Vitórias
          </Text>
          <Text fontSize={'20px'} fontWeight={'bold'}>
            {profile.stats.wins}
          </Text>
        </Container>

        <Container column align="center" justify="center" fitContent>
          <Text fontSize={'14px'} fontWeight="medium" color="gray.700">
            Derrotas
          </Text>
          <Text fontSize={'20px'} fontWeight={'bold'}>
            {profile.stats.losses}
          </Text>
        </Container>

        <Container column align="center" justify="center" fitContent>
          <Text fontSize={'14px'} fontWeight="medium" color="gray.700">
            Abates
          </Text>
          <Text fontSize={'20px'} fontWeight={'bold'}>
            {profile.stats.kills}
          </Text>
        </Container>

        <Container column align="center" justify="center" fitContent>
          <Text fontSize={'14px'} fontWeight="medium" color="gray.700">
            Mortes
          </Text>
          <Text fontSize={'20px'} fontWeight={'bold'}>
            {profile.stats.deaths}
          </Text>
        </Container>

        <Container column align="center" justify="center" fitContent>
          <Text fontSize={'14px'} fontWeight="medium" color="gray.700">
            Assistencias
          </Text>
          <Text fontSize={'20px'} fontWeight={'bold'}>
            {profile.stats.assists}
          </Text>
        </Container>

        <Container column align="center" justify="center" fitContent>
          <Text fontSize={'14px'} fontWeight="medium" color="gray.700">
            Headshots
          </Text>
          <Text fontSize={'20px'} fontWeight={'bold'}>
            {profile.stats.head_shots}
          </Text>
        </Container>
      </Container>
    </Container>
  )
}
