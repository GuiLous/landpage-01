import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Link,
  PinInput,
  PinInputField,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { Container } from '@components'
import { SignupLayout } from '@layouts'
import { HttpService, StorageService } from '@services'
import { update } from '@slices/UserSlice'
import style from './Verify.module.css'

export default function VerifyView() {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useToast()
  const [value, setValue] = useState()
  const [fetching, setFetching] = useState()

  useEffect(() => {
    if (!user || !user.account || user.account.is_verified) navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleButtonClick = () =>
    value && value.length === 6 && handleSubmit({ verification_token: value })
  const handleChange = (value) => setValue(value)

  const handleSubmit = async (form) => {
    setFetching(true)
    const token = StorageService.get('token')

    const response = await HttpService.post('accounts/verify/', token, form)
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
  }

  return (
    user && (
      <SignupLayout>
        <Container
          className={style.container}
          column
          align="center"
          justify="center"
        >
          <FormControl>
            <FormLabel style={{ textAlign: 'center' }}>
              Informe o código recebido para verificar sua conta
            </FormLabel>

            <Container justify="center" className={style.pin}>
              <Container className={style.pinWrapper} justify="between">
                <PinInput
                  placeholder="-"
                  onChange={handleChange}
                  type="alphanumeric"
                  autoFocus
                  manageFocus
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </Container>
            </Container>
            <FormHelperText>
              Enviamos um código de 6 dígitos para <strong>{user.email}</strong>
              . Se esse não é seu e-mail,{' '}
              <Link as={RouterLink} to="/alterar-email" variant={'inline'}>
                clique aqui
              </Link>{' '}
              para cadastrar um novo e-mail. <strong>Dica:</strong> se seu
              e-mail não chegou, verifique sua caixa de lixo eletrônico.
            </FormHelperText>
          </FormControl>

          <Container>
            <Button
              style={{ flex: 1, marginTop: 16 }}
              onClick={handleButtonClick}
              isDisabled={!value || value.length !== 6}
              isLoading={fetching}
              loadingText="Enviando"
            >
              Validar e jogar agora!
            </Button>
          </Container>
        </Container>
      </SignupLayout>
    )
  )
}
