import { Button, FormControl, FormLabel } from '@chakra-ui/react'
import { useState } from 'react'

import { Container, Input } from '@components'
import { REACT_APP_API_URL } from '@config'
import { isEmailValid } from '../input/Validators'
import style from './FakeSigninForm.module.css'

export default function FakeSigninForm({ fetching, onSubmit }) {
  const [value, setValue] = useState()

  const handleButtonClick = () => {
    if (isEmailValid(value)) onSubmit({ email: value })
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
          <FormControl>
            <FormLabel>Entrar sem Steam</FormLabel>

            <Input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="exemplo@email.com"
            />
          </FormControl>

          <Container>
            <Button
              style={{ flex: 1, marginTop: 16 }}
              onClick={handleButtonClick}
              isDisabled={!value || !isEmailValid(value)}
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
