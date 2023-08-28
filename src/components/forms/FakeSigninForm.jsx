import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputRightElement,
  Select,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { RiErrorWarningFill } from 'react-icons/ri'

import { Container, Input } from '@components'
import { isEmailValid } from '@components/forms/Validators'
import { REACT_APP_API_URL } from '@config'
import style from './FakeSigninForm.module.css'

export default function FakeSigninForm({ fetching, onSubmit, fieldsErrors }) {
  const [value, setValue] = useState()

  const emails = [
    'player1@reloadclub.gg',
    'player2@reloadclub.gg',
    'player3@reloadclub.gg',
    'player4@reloadclub.gg',
    'player5@reloadclub.gg',
    'player6@reloadclub.gg',
    'player7@reloadclub.gg',
    'player8@reloadclub.gg',
    'player9@reloadclub.gg',
    'player10@reloadclub.gg',
  ]

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
          <Container column gap={8}>
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
                    color="red.500"
                    fontSize={22}
                    children={<RiErrorWarningFill />}
                    data-testid="warningIcon"
                  />
                )}
              </InputGroup>

              {fieldsErrors?.email && (
                <FormErrorMessage>{fieldsErrors?.email}</FormErrorMessage>
              )}
            </FormControl>

            <Container align="center" justify="center">
              <Text color="white" fontSize={16} fontWeight="medium">
                ou
              </Text>
            </Container>
            <Select
              bg="gray.800"
              border="none"
              onChange={handleChange}
              minH="44px"
              borderRadius={4}
              data-testid="select"
            >
              <option
                style={{ backgroundColor: '#1E1E1E' }}
                value={''}
                disabled
              >
                Selecione um email
              </option>
              {emails.map((item, index) => (
                <option
                  key={index}
                  style={{ backgroundColor: '#1E1E1E' }}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </Select>
          </Container>

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
