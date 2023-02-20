import React from 'react'

import { Container } from '@components'
import style from './UserCard.module.css'

export default function UserCard(props) {
  return (
    <Container className={style.container}>
      <p>{props.username}</p>
    </Container>
  )
}
