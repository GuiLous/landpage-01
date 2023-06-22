import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { useState } from 'react'
import { RiErrorWarningFill } from 'react-icons/ri'

import { Container, Input } from '@components'
import { isEmailValid } from '@components/forms/Validators'
import { REACT_APP_API_URL } from '@config'
import style from './FakeSigninForm.module.css'

export default function FakeSigninForm({ fetching, onSubmit, fieldsErrors }) {
  const [value, setValue] = useState()

  const handleButtonClick = () => {
    if (isEmailValid(value)) onSubmit({ email: value })
  }

  const handleKeyEnterDown = (event) => {
    if (event.key === 'Enter') {
      isEmailValid(value) && onSubmit({ email: value })
    }
  }

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const formAction = `${REACT_APP_API_URL}/api/accounts/fake-signup/`

  return (
    <Container className={style.container}>
      <form
        action={formAction}
        method="POST"
        onSubmit={handleSubmit}
        style={{ width: '100%' }}
      >
        <Container className={style.formset} column>
          <FormControl isInvalid={fieldsErrors?.email}>
            <FormLabel>Entrar sem Steam</FormLabel>

            <InputGroup>
              <Input
                onChange={handleChange}
                onKeyDown={handleKeyEnterDown}
                type="email"
                name="email"
                placeholder="exemplo@email.com"
              />

              {fieldsErrors?.email && (
                <InputRightElement
                  color="danger.400"
                  fontSize={22}
                  children={<RiErrorWarningFill />}
                />
              )}
            </InputGroup>

            {fieldsErrors?.email && (
              <FormErrorMessage>{fieldsErrors?.email}</FormErrorMessage>
            )}
          </FormControl>

          <Container>
            <Button
              flex={1}
              marginTop={3}
              onClick={handleButtonClick}
              isDisabled={!value}
              isLoading={fetching}
              loadingText="Enviando"
            >
              Entrar
            </Button>
          </Container>
        </Container>

        <p className={style.helper}>*Disponível somente para testes.</p>
      </form>
    </Container>
  )
}
