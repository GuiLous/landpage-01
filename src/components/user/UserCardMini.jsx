import { Icon, Link, Text } from '@chakra-ui/react'
import React from 'react'
import { SiSteam } from 'react-icons/si'
import { Link as RouterLink } from 'react-router-dom'

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
          <Container className={style.actionLink} justify="center" fitContent>
            <Link as={RouterLink} to={`/perfil/${props.user_id}/`}>
              <Icon as={UserIcon} />
            </Link>
          </Container>

          <Container
            className={style.actionLink}
            justify="center"
            fitContent
            align="center"
            style={{ position: 'relative', top: '5px' }}
          >
            <Link
              href={`https://steamcommunity.com/profiles/${props.steamid}`}
              isExternal
            >
              <Icon as={SiSteam} color="white" />
            </Link>
          </Container>
        </Container>
      </Container>

      <Container
        className={style.level}
        style={{ top: props.level < 10 && '4px', maxWidth: '50px' }}
        justify="end"
      >
        <LevelBadge
          level={props.level}
          fitParent
          fontSize={13}
          textYPosition={-4}
        />
      </Container>
    </Container>
  )
}
