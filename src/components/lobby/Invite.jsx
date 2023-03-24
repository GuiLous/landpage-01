import { Badge, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'

import { Avatar, Container, UserStatus } from '@components'
import { HttpService, StorageService, Toast } from '@services'
import { removeInvite } from '@slices/UserSlice'
import style from './Invite.module.css'

export default function Invite({
  id,
  lobby_id,
  from_player,
  lobby,
  changeTab,
  meta,
}) {
  const token = StorageService.get('token')
  const dispatch = useDispatch()
  const invitesReceivedLen = meta

  const handleAccept = async () => {
    const response = await HttpService.patch(
      `mm/lobby/${lobby_id}/accept-invite/${id}/`,
      token
    )

    if (response.errorMsg) {
      Toast({
        title: 'Oops, ocorreu um erro',
        description: response.errorMsg,
        status: 'error',
      })
    } else {
      dispatch(removeInvite({ id: id }))
      changeTab(0)
    }
  }

  const handleRefuse = async () => {
    const response = await HttpService.patch(
      `mm/lobby/${lobby_id}/refuse-invite/${id}/`,
      token
    )

    if (response.errorMsg) {
      Toast({
        title: 'Oops, ocorreu um erro',
        description: response.errorMsg,
        status: 'error',
      })
    } else {
      if (invitesReceivedLen <= 1) changeTab(0)
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
