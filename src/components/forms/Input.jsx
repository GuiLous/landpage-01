import { Input as ChakraInput } from '@chakra-ui/react'

import { Container } from '@components'

import style from './Input.module.css'

export default function Input({ leftIcon, ...props }) {
  return (
    <Container align="center" style={{ position: 'relative' }}>
      {leftIcon && (
        <Container fitContent className={style.leftIcon}>
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
