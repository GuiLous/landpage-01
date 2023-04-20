import { Button, Text } from '@chakra-ui/react'
import React from 'react'

import { Container, Timer } from '@components'

export default function RestrictedButton({ restriction_countdown, ...props }) {
  return (
    <Button size="xl" variant="danger" {...props}>
      <Container align="center" column>
        <Timer initialTime={restriction_countdown} reverse />
        <Text fontSize={12} textTransform="initial">
          FILA RESTRINGIDA
        </Text>
      </Container>
    </Button>
  )
}
