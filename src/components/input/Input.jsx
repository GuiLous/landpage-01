import { Input as ChakraInput } from '@chakra-ui/react'
import React from 'react'

export default function Input(props) {
  return (
    <ChakraInput
      style={{
        borderRadius: 8,
        borderColor: 'transparent',
        height: 44,
      }}
      {...props}
    />
  )
}
