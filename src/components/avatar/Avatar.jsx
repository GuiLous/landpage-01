import { AvatarBadge, Avatar as ChakraAvatar } from '@chakra-ui/react'
import React from 'react'

import { Container } from '@components'

export default function Avatar(props) {
  return (
    <Container>
      <ChakraAvatar {...props}>
        <AvatarBadge />
      </ChakraAvatar>
    </Container>
  )
}
