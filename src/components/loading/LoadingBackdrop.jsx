import React from 'react'

import { Container } from '@components'
import style from './LoadingBackdrop.module.css'

export default function LoadingBackdrop({ children }) {
  return (
    <Container
      align="center"
      justify="center"
      column
      gap={12}
      className={style.container}
    >
      {children}
    </Container>
  )
}
