import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Link,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { Container, Input } from '@components'
import { isEmailValid } from '@components/input/Validators'
import { SignupLayout } from '@layouts'
import { HttpService, StorageService } from '@services'
import { update } from '@slices/UserSlice'
import style from './Signup.module.css'

export default function SignupView() {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useToast()
  const [value, setValue] = useState()
  const [fetching, setFetching] = useState()

  useEffect(() => {
    if (!user || user.account) navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleButtonClick = () => {
    if (isEmailValid(value))
      handleSubmit({ email: value, policy: true, terms: true })
  }

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleSubmit = async (form) => {
    setFetching(true)
    const token = StorageService.get('token')
    let response

    response = await HttpService.post('accounts/', token, form)
    if (response.error) {
      toast({
        title: 'Oops, ocorreu um erro',
        description: response.error,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right',
      })
      setFetching(false)
      return
    }

    dispatch(update(response))
    if (response.account.is_verified) navigate('/jogar')
    else navigate('/verificar')
  }

  return (
    <SignupLayout>
      <Container
        className={style.container}
        column
        align="center"
        justify="center"
      >
        <FormControl>
          <FormLabel>Cadastre seu e-mail</FormLabel>

          <Input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="exemplo@email.com"
          />
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
        </FormControl>

        <Container>
          <Button
            style={{ flex: 1, marginTop: 16 }}
            onClick={handleButtonClick}
            isDisabled={!value || !isEmailValid(value)}
            isLoading={fetching}
            loadingText="Enviando"
          >
            Completar cadastro
          </Button>
        </Container>
      </Container>
    </SignupLayout>
  )
}
