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
import { isEmailValid } from '@components/forms/Validators'
import { HttpService, StorageService } from '@services'
import { addToast } from '@slices/AppSlice'
import { updateUser } from '@slices/UserSlice'
import style from './Signup.module.css'

export default function SignupView() {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [value, setValue] = useState()
  const [fetching, setFetching] = useState()
  const [fieldsErrors, setFieldsErrors] = useState(null)

  useEffect(() => {
    if (!user || user.account) navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleButtonClick = () =>
    isEmailValid(value) &&
    handleSubmit({ email: value, policy: true, terms: true })

  const handleChange = (event) => {
    setValue(event.target.value)
    setFieldsErrors(null)
  }

  const handleSubmit = async (form) => {
    setFetching(true)
    const token = StorageService.get('token')
    let response

    response = await HttpService.post('accounts/', token, form)
    if (response.fieldsErrors) {
      setFieldsErrors(response.fieldsErrors)
      setFetching(false)
      return
    } else if (response.errorMsg) {
      dispatch(
        addToast({
          content: response.errorMsg,
          variant: 'error',
        })
      )
      setFetching(false)
      return
    }

    setFetching(false)
    dispatch(
      addToast({
        title: 'Que bom que você chegou!',
        content: 'Agora falta pouco, verifique sua conta para começar a jogar!',
        variant: 'success',
      })
    )
    dispatch(updateUser(response))
    if (response.account) navigate('/verificar')
  }

  const handleKeyEnterDown = (event) => {
    if (event.key === 'Enter') {
      isEmailValid(value) &&
        handleSubmit({ email: value, policy: true, terms: true })
    }
  }

  return (
    <Container className={style.container} column align="center" fitContent>
      <FormControl isInvalid={fieldsErrors?.email}>
        <FormLabel>E-mail</FormLabel>

        <Input
          onChange={handleChange}
          onKeyDown={handleKeyEnterDown}
          type="email"
          name="email"
          placeholder="Seu e-mail aqui"
        />

        {fieldsErrors?.email && (
          <FormErrorMessage>{fieldsErrors?.email}</FormErrorMessage>
        )}

        <Container column align="stretch">
          <Button
            flex={1}
            marginTop={3}
            onClick={handleButtonClick}
            isDisabled={!value || !isEmailValid(value)}
            isLoading={fetching}
            loadingText="Enviando"
          >
            Cadastrar
          </Button>

          <FormHelperText color="gray.700">
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
  )
}
