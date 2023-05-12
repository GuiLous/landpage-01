import { Divider, Icon, Link, Text } from '@chakra-ui/react'
import React from 'react'
import { SiSteam } from 'react-icons/si'
import { Link as RouterLink } from 'react-router-dom'

import { CloseIcon, Container, LevelBadge, UserIcon } from '@components'
import style from './UserCard.module.css'

export default function UserCard(props) {
  return (
    <Container className={style.container} column>
      {props.showLeave && (
        <CloseIcon className={style.leaveAction} onClick={props.onLeave} />
      )}

      <Container column align="center" justify="between" gap={16} fitContent>
        <Container className={style.avatar} align="center" justify="center">
          <img src={props.avatar.large} alt={props.username} />
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
          <Text className={style.lastResults}>
            {props.last_results?.join(' - ')}
          </Text>
        </Container>

        <Divider
          bg={'rgba(255, 255, 255, .4)'}
          orientation="horizontal"
          style={{ maxWidth: '150px' }}
        />

        <Container className={style.matchCount} justify="center" fitContent>
          <Text>
            {props.matches_played} Partida{props.matches_played > 1 && 's'}{' '}
            jogada{props.matches_played > 1 && 's'}
          </Text>
        </Container>
      </Container>

      <Container className={style.level} align="center" justify="center">
        <LevelBadge level={props.level} />
      </Container>

      <Container
        className={style.actions}
        justify="center"
        align="center"
        gap={30}
      >
        <Container className={style.actionLink} justify="center" fitContent>
          <Link as={RouterLink} to={`/perfil/${props.userId}/`}>
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
  )
}
