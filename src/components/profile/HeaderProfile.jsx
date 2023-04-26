import { Avatar, Progress, Text } from '@chakra-ui/react'
import React from 'react'

import { Container } from '@components'
import style from './HeaderProfile.module.css'

export default function HeaderProfile({ profile }) {
  return (
    <Container className={style.container} gap={26} align="end">
      <Container className={style.avatar} fitContent>
        <Avatar
          src={profile.avatar.medium}
          variant={profile.status}
          size={'xl'}
        />
      </Container>

      <Container className={style.userInfo} column gap={6}>
        <Container className={style.username}>
          <Text>{profile.username}</Text>
        </Container>

        <Container className={style.levelInfo} column>
          <Container className={style.levelTxt}>
            <Text>Level {profile.level}</Text>
          </Container>

          <Container className={style.levelBar}>
            <Progress h={'7px'} value={profile.level_points} />
          </Container>

          <Container className={style.levelHelper} justify="between">
            <Text>Pontos de Nível</Text>
            <Text>{profile.level_points}/100</Text>
          </Container>
        </Container>
      </Container>

      <Container className={style.userStats}>
        <Container column align="center" justify="center">
          <Text fontSize={'16px'} fontWeight={'500'} color="gray.700">
            Vitórias
          </Text>
          <Text fontSize={'24px'} fontWeight={'bold'}>
            {profile.stats.wins}
          </Text>
        </Container>

        <Container column align="center" justify="center">
          <Text fontSize={'16px'} fontWeight={'500'} color="gray.700">
            Derrotas
          </Text>
          <Text fontSize={'24px'} fontWeight={'bold'}>
            {profile.stats.wins}
          </Text>
        </Container>

        <Container column align="center" justify="center">
          <Text fontSize={'16px'} fontWeight={'500'} color="gray.700">
            Abates
          </Text>
          <Text fontSize={'24px'} fontWeight={'bold'}>
            {profile.stats.wins}
          </Text>
        </Container>

        <Container column align="center" justify="center">
          <Text fontSize={'16px'} fontWeight={'500'} color="gray.700">
            Mortes
          </Text>
          <Text fontSize={'24px'} fontWeight={'bold'}>
            {profile.stats.wins}
          </Text>
        </Container>

        <Container column align="center" justify="center">
          <Text fontSize={'16px'} fontWeight={'500'} color="gray.700">
            Assistencias
          </Text>
          <Text fontSize={'24px'} fontWeight={'bold'}>
            {profile.stats.wins}
          </Text>
        </Container>

        <Container column align="center" justify="center">
          <Text fontSize={'16px'} fontWeight={'500'} color="gray.700">
            Headshots
          </Text>
          <Text fontSize={'24px'} fontWeight={'bold'}>
            {profile.stats.wins}
          </Text>
        </Container>
      </Container>
    </Container>
  )
}
