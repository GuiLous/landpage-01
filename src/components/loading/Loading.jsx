import React from 'react'

import loadingGif from '@assets/images/loading.gif'
import { Container } from '@components'
import style from './Loading.module.css'

export default function Loading(props) {
  return (
    <Container align="center" justify="center" className={style.container}>
      <img src={loadingGif} alt="Carregando..." />
    </Container>
  )
}
