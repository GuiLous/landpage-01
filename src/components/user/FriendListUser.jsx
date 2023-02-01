import { Text, useToast } from '@chakra-ui/react'
import React from 'react'

import { AddUserIcon, Avatar, Container, UserStatus } from '@components'
import { HttpService, StorageService } from '@services'
import { useSelector } from 'react-redux'
import style from './FriendListUser.module.css'

export default function FriendListUser(props) {
  const user = useSelector((state) => state.user)
  const toast = useToast()

  const isAvailable = () => {
    switch (props.status) {
      case 'online':
        return true

      case 'offline':
        return false

      case 'away':
        return true

      case 'in_game':
        return false

      case 'teaming':
        return true

      case 'queued':
        return false

      default:
        return false
    }
  }

  const handleInvite = async () => {
    if (!isAvailable()) return

    const token = StorageService.get('token')

    const response = await HttpService.post(
      `mm/lobby/${user.account.lobby.id}/invite-player/${props.id}/`,
      token
    )

    if (response.errorMsg) {
      toast({
        title: 'Oops, ocorreu um erro',
        description: response.errorMsg,
        status: 'error',
        isClosable: true,
        position: 'bottom-right',
        duration: 6000,
      })
    }
  }

  return (
    <Container
      className={[style.container, !isAvailable() && style.disabled].join(' ')}
      justify="center"
      align="center"
      fitContent
      onClick={handleInvite}
    >
      <Container gap={15}>
        <Container fitContent>
          <Avatar variant={props.status} className={style.avatar} />
        </Container>

        <Container column justify="center" className={style.info}>
          <Text className={style.username}>{props.username}</Text>
          <UserStatus className={style.status} status={props.status} />
        </Container>
      </Container>

      {props.status === 'online' && (
        <Container justify="end" className={style.invite} align="center">
          <AddUserIcon />
        </Container>
      )}
    </Container>
  )
}
