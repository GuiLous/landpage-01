import { Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { SiSteam } from 'react-icons/si'

import { CloseIcon, Container, LevelBadge, UserIcon } from '@components'
import style from './UserCardMini.module.css'

export default function UserCardMini(props) {
  return (
    <Container className={style.container} align="center">
      {props.showLeave && (
        <CloseIcon className={style.leaveAction} onClick={props.onLeave} />
      )}

      <Container className={style.avatar} fitContent>
        <img src={props.avatar.medium} alt={props.username} />
      </Container>

      <Container column className={style.infos}>
        <Container className={style.username}>
          <Text>{props.username}</Text>
        </Container>

        <Container className={style.actions} gap={10}>
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

      <Container className={style.level}>
        <LevelBadge level={props.level} small />
      </Container>
    </Container>
  )
}
