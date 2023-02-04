import { Avatar as ChakraAvatar, AvatarBadge } from '@chakra-ui/react'
import React from 'react'

import { Container } from '@components'
import style from './Avatar.module.css'

export default function Avatar(props) {
  return (
    <Container className={style.container}>
      <ChakraAvatar {...props}>
        <AvatarBadge />
      </ChakraAvatar>
    </Container>
  )
}
