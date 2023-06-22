import { Input as ChakraInput } from '@chakra-ui/react'
import React from 'react'

import { Container } from '@components'

export default function Input({ leftIcon, ...props }) {
  return (
    <Container align="center" style={{ position: 'relative' }}>
      {leftIcon && (
        <Container
          fitContent
          style={{
            position: 'absolute',
            zIndex: '1',
            width: 'auto',
            left: '16px',
          }}
        >
          {leftIcon}
        </Container>
      )}

      <Container>
        <ChakraInput
          style={{
            borderRadius: 4,
            borderColor: 'transparent',
            height: 42,
            paddingLeft: leftIcon ? '46px' : '16px',
            letterSpacing: '1px',
          }}
          {...props}
        />
      </Container>
    </Container>
  )
}
