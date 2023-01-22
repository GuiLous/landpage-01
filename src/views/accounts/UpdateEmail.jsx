import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Link,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Container, Input } from '@components'
import { isEmailValid } from '@components/input/Validators'
import { SignupLayout } from '@layouts'
import { HttpService, StorageService } from '@services'
import { updateUser } from '@slices/UserSlice'
import style from './UpdateEmail.module.css'

export default function SignupView() {
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
    isEmailValid(value) && handleSubmit({ email: value })

  const handleChange = (event) => setValue(event.target.value)

  const handleSubmit = async (form) => {
    setFetching(true)
    const token = StorageService.get('token')
    let response

    response = await HttpService.patch('accounts/update-email/', token, form)
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
    else navigate('/verificar')
  }

  const handleCancel = (event) => {
    navigate(-1)
  }

  return (
    <SignupLayout>
      <Container
        className={style.container}
        column
        align="center"
        justify="center"
        fitContent
      >
        <FormControl isInvalid={formError}>
          <FormLabel>Altere seu e-mail</FormLabel>

          <Input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="exemplo@email.com"
          />

          {formError && (
            <FormErrorMessage>{formError.errorMsg}</FormErrorMessage>
          )}
        </FormControl>

        <Container fitContent>
          <Button
            style={{ flex: 1, marginTop: 16 }}
            onClick={handleButtonClick}
            isDisabled={!value || !isEmailValid(value)}
            isLoading={fetching}
            loadingText="Enviando"
          >
            Alterar e-mail
          </Button>
        </Container>

        <Container justify="center" className={style.cancelBtn}>
          <Link onClick={handleCancel}>Cancelar e voltar</Link>
        </Container>
      </Container>
    </SignupLayout>
  )
}
