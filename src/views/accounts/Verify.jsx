import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
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
import { updateUser } from '@slices/UserSlice'
import style from './Verify.module.css'

export default function VerifyView() {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useToast()
  const [value, setValue] = useState()
  const [fetching, setFetching] = useState()
  const [formError, setFormError] = useState()

  useEffect(() => {
    if (!user || !user.account || user.account.is_verified) navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleButtonClick = () =>
    value && value.length === 6 && handleSubmit({ verification_token: value })
  const handleChange = (value) => {
    setValue(value)
    setFormError(null)
  }

  const handleSubmit = async (form) => {
    setFetching(true)
    const token = StorageService.get('token')

    const response = await HttpService.post('accounts/verify/', token, form)
    if (response.errorMsg) {
      setFetching(false)
      if (response.field) setFormError(response)
      else
        toast({
          title: 'Oops, ocorreu um erro',
          description: response.errorMsg,
          status: 'error',
          isClosable: true,
          position: 'bottom-right',
          duration: 6000,
        })
      return
    }

    setFetching(false)
    dispatch(updateUser(response))
    if (response.account.is_verified) navigate('/jogar')
  }

  return (
    user && (
      <SignupLayout>
        <Container className={style.container} column justify="center">
          <Container className={style.formTitle} justify="center">
            Verificação obrigatória
          </Container>

          <Container justify="center">
            <FormControl isInvalid={formError}>
              <FormLabel style={{ textAlign: 'center', fontSize: 16 }}>
                Informe o código recebido para verificar sua conta
              </FormLabel>

              <Container justify="center" className={style.pin}>
                <Container className={style.pinWrapper} justify="between">
                  <PinInput
                    placeholder=""
                    onChange={handleChange}
                    type="alphanumeric"
                    autoFocus
                    isInvalid={formError}
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

              {formError && (
                <Container justify="center">
                  <FormErrorMessage style={{ textAlign: 'center' }}>
                    {formError.errorMsg}
                  </FormErrorMessage>
                </Container>
              )}

              <Divider
                style={{
                  borderColor: 'rgba(153, 153, 153, .3)',
                  marginTop: 25,
                }}
              />

              <FormHelperText style={{ textAlign: 'center', marginTop: 25 }}>
                Enviamos um código para <strong>{user.email}</strong>. <br />{' '}
                Não é seu e-mail?{' '}
                <Link as={RouterLink} to="/alterar-email" variant={'inline'}>
                  Clique aqui
                </Link>
                .
              </FormHelperText>
            </FormControl>
          </Container>

          <Container justify="center">
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
