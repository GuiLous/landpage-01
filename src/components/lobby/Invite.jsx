import { Badge, Icon, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'

import { Avatar, Container, UserStatus } from '@components'
import { HttpService, StorageService } from '@services'
import { removeInvite } from '@slices/UserSlice'
import style from './Invite.module.css'

export default function Invite({ id, lobby_id, from_player, lobby }) {
  const toast = useToast()
  const token = StorageService.get('token')
  const dispatch = useDispatch()

  const handleAccept = async () => {
    const response = await HttpService.patch(
      `mm/lobby/${lobby_id}/accept-invite/${id}/`,
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
    } else {
      dispatch(removeInvite({ id: id }))
    }
  }

  const handleRefuse = async () => {
    const response = await HttpService.patch(
      `mm/lobby/${lobby_id}/refuse-invite/${id}/`,
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
    } else {
      dispatch(removeInvite(response))
    }
  }

  return (
    <Container
      className={style.container}
      justify="center"
      align="center"
      fitContent
    >
      <Container gap={15}>
        <Container fitContent className={style.meta}>
          <Avatar variant={from_player.status} className={style.avatar} />
          <Badge variant="primary" className={style.badge}>
            + {lobby.players_count - 1}
          </Badge>
        </Container>

        <Container column justify="center" className={style.info}>
          <Text className={style.username}>{from_player.username}</Text>
          <UserStatus status={from_player.status} className={style.status} />
        </Container>
      </Container>

      <Container justify="end" className={style.actions} align="center">
        <Container
          align="center"
          onClick={handleRefuse}
          justify="around"
          fitContent
          className={style.action}
        >
          <Icon w="20px" h="20px" as={BsFillXCircleFill} color="danger.400" />
        </Container>

        <Container
          align="center"
          onClick={handleAccept}
          justify="around"
          fitContent
          className={style.action}
        >
          <Icon w="20px" h="20px" as={BsFillCheckCircleFill} color="success" />
        </Container>
      </Container>
    </Container>
  )
}
