import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Link,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { Container, Input } from '@components'
import { isEmailValid } from '@components/input/Validators'
import { SignupLayout } from '@layouts'
import { HttpService, StorageService, Toast } from '@services'
import { updateUser } from '@slices/UserSlice'
import style from './Signup.module.css'

export default function SignupView() {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [value, setValue] = useState()
  const [fetching, setFetching] = useState()
  const [formError, setFormError] = useState()

  useEffect(() => {
    if (!user || user.account) navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleButtonClick = () =>
    isEmailValid(value) &&
    handleSubmit({ email: value, policy: true, terms: true })

  const handleChange = (event) => {
    setValue(event.target.value)
    setFormError(null)
  }

  const handleSubmit = async (form) => {
    setFetching(true)
    const token = StorageService.get('token')
    let response

    response = await HttpService.post('accounts/', token, form)
    if (response.errorMsg) {
      setFetching(false)
      if (response.field) setFormError(response)
      else
        Toast({
          title: 'Oops, ocorreu um erro',
          description: response.errorMsg,
          status: 'error',
        })
      return
    }

    setFetching(false)
    dispatch(updateUser(response))
    if (response.account.is_verified) navigate('/jogar')
    else navigate('/verificar')
  }

  const handleKeyEnterDown = (event) => {
    if (event.key === 'Enter') {
      isEmailValid(value) &&
        handleSubmit({ email: value, policy: true, terms: true })
    }
  }

  return (
    <SignupLayout>
      <Container className={style.container} column align="center" fitContent>
        <FormControl isInvalid={formError}>
          <FormLabel>Cadastre seu e-mail</FormLabel>

          <Input
            onChange={handleChange}
            onKeyDown={handleKeyEnterDown}
            type="email"
            name="email"
            placeholder="exemplo@email.com"
          />

          {formError && (
            <FormErrorMessage>{formError.errorMsg}</FormErrorMessage>
          )}

          <Container column align="stretch">
            <Button
              style={{ flex: 1, marginTop: 16 }}
              onClick={handleButtonClick}
              isDisabled={!value || !isEmailValid(value)}
              isLoading={fetching}
              loadingText="Enviando"
            >
              Completar cadastro
            </Button>

            <FormHelperText>
              Ao se cadastrar, você concorda com os{' '}
              <Link as={RouterLink} to="/termos-de-uso" variant={'inline'}>
                Termos de Uso
              </Link>{' '}
              e a{' '}
              <Link
                as={RouterLink}
                to="/política-de-privacidade"
                variant={'inline'}
              >
                Política de Privacidade
              </Link>
            </FormHelperText>
          </Container>
        </FormControl>
      </Container>
    </SignupLayout>
  )
}
