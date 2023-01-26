import { Link, useToast } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'

import { Container } from '@components'
import { HttpService, StorageService } from '@services'
import { removeInvite } from '@slices/UserSlice'
import style from './Invite.module.css'

export default function Invite({ id, lobby_id, from_player }) {
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
    <Container className={style.container} column>
      <p>Convite de {from_player.username}</p>
      <Container gap={10}>
        <Link onClick={handleAccept}>Aceitar</Link>
        <Link onClick={handleRefuse}>Recusar</Link>
      </Container>
    </Container>
  )
}
