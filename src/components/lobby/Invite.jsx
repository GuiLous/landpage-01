import { Link } from '@chakra-ui/react'
import React from 'react'

import { Container } from '@components'
import style from './Invite.module.css'

export default function Invite({ id, lobby_id, from_player }) {
  const handleAccept = async () => {}

  const handleRefuse = async () => {}

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
