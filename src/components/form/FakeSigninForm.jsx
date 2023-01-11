import { useState } from 'react'

import { Container } from '@components'
import { REACT_APP_API_URL } from '@config'
import style from './FakeSigninForm.module.css'
import { InputText, Button } from '@components'
import { validateEmail } from '../input/Validators'

export default function FakeSigninForm(props) {
  const [value, setValue] = useState()

  const handleButtonClick = () => {
    if (validateEmail(value)) props.onSubmit({ email: value })
  }

  const handleChange = (value) => {
    setValue(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const formAction = `${REACT_APP_API_URL}/api/accounts/fake-signup/`

  return (
    <Container align="center" justify="center" className={style.container}>
      <form action={formAction} method="POST" onSubmit={handleSubmit}>
        <p className={style.title}>Entre sem uma conta da Steam</p>

        <Container align="stretch" justify="center" className={style.formset}>
          <Container align="stretch" justify="center" weight={75}>
            <InputText
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="E-mail"
            />
          </Container>

          <Container className={style.button} weight={25}>
            <Button
              label="Entrar"
              onClick={handleButtonClick}
              className={style.button}
              disabled={!value || props.fetching || !validateEmail(value)}
              animated={props.fetching}
            />
          </Container>
        </Container>

        <p className={style.helper}>
          Disponível <b>somente para testes.</b> <br /> Caso o email informado
          não seja encontrado, uma nova conta será criada com o email fornecido.
        </p>
      </form>
    </Container>
  )
}
