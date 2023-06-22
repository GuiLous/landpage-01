import { Input as ChakraInput } from '@chakra-ui/react'
import React from 'react'

import { Container } from '@components'

export default function Input(props) {
  return (
    <Container align="center" style={{ position: 'relative' }}>
      {props.leftIcon && (
        <Container
          fitContent
          style={{
            position: 'absolute',
            zIndex: '1',
            width: 'auto',
            left: '16px',
          }}
        >
          {props.leftIcon}
        </Container>
      )}

      <Container>
        <ChakraInput
          style={{
            borderRadius: 4,
            borderColor: 'transparent',
            height: 42,
            paddingLeft: props.leftIcon ? '46px' : '16px',
            letterSpacing: '1px',
          }}
          {...props}
        />
      </Container>
    </Container>
  )
}
