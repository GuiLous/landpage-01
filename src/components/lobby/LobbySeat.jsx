import React from 'react'

import { CloseIcon, Container } from '@components'
import style from './LobbySeat.module.css'

export default function LobbySeat({ mini, disabled }) {
  return (
    <Container
      align="center"
      justify="center"
      className={[
        style.container,
        mini && style.mini,
        disabled && style.disabled,
      ].join(' ')}
    >
      <Container align="center" justify="center" className={style.wrapper}>
        <CloseIcon className={style.icon} />
      </Container>
      <Container className={style.border}></Container>
    </Container>
  )
}
