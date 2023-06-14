import {
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
  IconButton,
  Link,
  PinInput,
  PinInputField,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { ArrowRightIcon, Container, LockIcon } from '@components'
import { SignupLayout } from '@layouts'
import { HttpService, StorageService } from '@services'
import { addToast } from '@slices/AppSlice'
import { updateUser } from '@slices/UserSlice'
import style from './Verify.module.css'

export default function VerifyView() {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [value, setValue] = useState()
  const [fetching, setFetching] = useState()
  const [fieldsErrors, setFieldsErrors] = useState(null)

  useEffect(() => {
    if (!user || !user.account || user.account.is_verified) navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleButtonClick = () =>
    value && value.length === 6 && handleSubmit({ verification_token: value })

  const handleChange = (value) => {
    setValue(value)
    setFieldsErrors(null)
  }

  const handleSubmit = async (form) => {
    setFetching(true)
    const token = StorageService.get('token')

    const response = await HttpService.post('accounts/verify/', token, form)
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
    dispatch(updateUser(response))
    dispatch(
      addToast({
        title: 'Sua conta foi verificada!',
        content: 'Convide seus amigos e comece a jogar!',
        variant: 'success',
      })
    )
    if (response.account.is_verified) navigate('/jogar')
  }

  const handleKeyEnterDown = (event) => {
    if (event.key === 'Enter') {
      value && value.length === 6 && handleSubmit({ verification_token: value })
    }
  }

  return (
    user && (
      <SignupLayout>
        <Container
          className={style.container}
          column
          justify="center"
          fitContent
        >
          <Container
            className={style.formTitle}
            align="center"
            justify="center"
            column
          >
            <Icon style={{ fontSize: 40, marginBottom: 32 }} as={LockIcon} />
            Verificação obrigatória
          </Container>

          <Container justify="center">
            <FormControl isInvalid={fieldsErrors?.pin}>
              <FormLabel style={{ textAlign: 'center', fontSize: 16 }}>
                Informe o código recebido para verificar sua conta
              </FormLabel>

              <Container justify="center" className={style.pin}>
                <Container
                  className={style.pinWrapper}
                  justify="between"
                  gap={10}
                >
                  <PinInput
                    placeholder=""
                    onChange={handleChange}
                    type="alphanumeric"
                    autoFocus
                    isInvalid={fieldsErrors?.pin}
                    manageFocus
                  >
                    <PinInputField fontSize="24px" minH="48px" minW="48px" />
                    <PinInputField fontSize="24px" minH="48px" minW="48px" />
                    <PinInputField fontSize="24px" minH="48px" minW="48px" />
                    <PinInputField fontSize="24px" minH="48px" minW="48px" />
                    <PinInputField fontSize="24px" minH="48px" minW="48px" />
                    <PinInputField
                      fontSize="24px"
                      minH="48px"
                      minW="48px"
                      onKeyDown={handleKeyEnterDown}
                    />
                  </PinInput>
                  <IconButton
                    variant="pin"
                    isDisabled={!value || value.length !== 6}
                    isLoading={fetching}
                    onClick={handleButtonClick}
                    aria-label="Validar e jogar agora!"
                    fontSize="18px"
                    style={{ minHeight: '48px', minWidth: '48px' }}
                    icon={<ArrowRightIcon color="white" />}
                  />
                </Container>
              </Container>

              {fieldsErrors?.pin && (
                <Container justify="center">
                  <FormErrorMessage style={{ textAlign: 'center' }}>
                    {fieldsErrors?.pin}
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
        </Container>
      </SignupLayout>
    )
  )
}
