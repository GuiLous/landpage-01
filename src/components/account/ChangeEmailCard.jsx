import { Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { AccountCard, Container } from '@components'
import style from './ChangeEmailCard.module.css'

export default function ChangeEmailCard() {
  const user = useSelector((state) => state.user)

  const inputRef = useRef(null)

  const [email, setEmail] = useState(user.email)
  const [isEditEnabled, setIsEditEnabled] = useState(false)

  const toggleInput = () => {
    setIsEditEnabled(true)
  }

  useEffect(() => {
    if (isEditEnabled && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditEnabled])

  return (
    <AccountCard
      title="ALTERAR E-MAIL"
      description="Essa informação é particular e não será compartilhada com outras pessoas."
    >
      <Container className={style.container}>
        <InputGroup maxW={424}>
          <Input
            ref={inputRef}
            autoFocus
            pl="16px"
            pr="16px"
            fontSize="14px"
            variant={isEditEnabled ? '' : 'disabled'}
            disabled={!isEditEnabled}
            value={email}
            _focus={{
              border: '2px solid #00E4C9',
              pl: '14px',
            }}
          />

          <InputRightElement
            right={4}
            cursor="pointer"
            onClick={toggleInput}
            width="fit-content"
          >
            <Text
              fontSize={14}
              fontWeight={isEditEnabled ? 500 : 400}
              color={isEditEnabled ? 'secondary.400' : 'white'}
            >
              {isEditEnabled ? 'confirmar' : 'editar'}
            </Text>
          </InputRightElement>
        </InputGroup>
      </Container>
    </AccountCard>
  )
}
