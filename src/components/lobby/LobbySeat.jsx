import React from 'react'

import { CloseIcon, Container } from '@components'
import style from './LobbySeat.module.css'

export default function LobbySeat(props) {
  return (
    <Container align="center" justify="center" className={style.container}>
      <Container align="center" justify="center" className={style.wrapper}>
        <CloseIcon className={style.icon} />
      </Container>
    </Container>
  )
}
