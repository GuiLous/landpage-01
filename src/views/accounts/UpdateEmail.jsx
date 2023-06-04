import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Link,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Container, Input } from '@components'
import { isEmailValid } from '@components/input/Validators'
import { SignupLayout } from '@layouts'
import { HttpService, StorageService } from '@services'
import { addToast } from '@slices/AppSlice'
import { updateUser } from '@slices/UserSlice'
import style from './UpdateEmail.module.css'

export default function SignupView() {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [value, setValue] = useState()
  const [fetching, setFetching] = useState()
  const [formError, setFormError] = useState()

  useEffect(() => {
    if (!user || !user.account) navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

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
        dispatch(
          addToast({
            title: 'Algo saiu errado...',
            content: response.errorMsg,
            variant: 'error',
          })
        )
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

  const handleKeyEnterDown = (event) => {
    if (event.key === 'Enter') {
      isEmailValid(value) && handleSubmit({ email: value })
    }
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
            onKeyDown={handleKeyEnterDown}
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
