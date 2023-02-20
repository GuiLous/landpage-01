import { Divider, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { SiSteam } from 'react-icons/si'

import { Container, LevelBadge, UserIcon } from '@components'
import style from './UserCard.module.css'

export default function UserCard(props) {
  return (
    <Container className={style.container} column>
      <Container column align="center" justify="between" gap={16} fitContent>
        <Container className={style.avatar} align="center" justify="center">
          <img src={props.avatar.large} />
        </Container>

        <Container className={style.username} justify="center">
          <Text>{props.username}</Text>
        </Container>
      </Container>

      <Container
        column
        align="center"
        className={style.infos}
        gap={4}
        fitContent
      >
        <Container align="center" justify="end" column fitContent>
          <Text>Últimas partidas</Text>
          <Text className={style.lastResults}>V - D - D</Text>
        </Container>

        <Divider orientation="horizontal" style={{ maxWidth: '150px' }} />

        <Container className={style.matchCount} justify="center" fitContent>
          <Text>10 Partidas jogadas</Text>
        </Container>
      </Container>

      <Container
        className={style.level}
        align="center"
        justify="center"
        fitContent
      >
        <LevelBadge level={props.level} />
      </Container>

      <Container className={style.actions} fitContent gap={30} justify="center">
        <Container
          align="center"
          justify="center"
          fitContent
          className={style.actionLink}
        >
          <Icon as={UserIcon} />
        </Container>

        <Container
          align="center"
          justify="center"
          fitContent
          className={style.actionLink}
        >
          <Icon as={SiSteam} />
        </Container>
      </Container>
    </Container>
  )
}
