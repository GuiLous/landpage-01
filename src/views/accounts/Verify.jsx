import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
  IconButton,
  Link,
  PinInput,
  PinInputField,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'

import { ArrowRightIcon, Container, LockIcon } from '@components'
import { HttpService, StorageService } from '@services'
import { addToast } from '@slices/AppSlice'
import style from './Verify.module.css'

export default function VerifyView() {
  const [isLessThan2xl] = useMediaQuery('(max-width: 1600px)')

  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [value, setValue] = useState()
  const [fetching, setFetching] = useState()
  const [fieldsErrors, setFieldsErrors] = useState(null)

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
    window.location.href = '/'
  }

  const handleKeyEnterDown = (event) => {
    if (event.key === 'Enter') {
      value && value.length === 6 && handleSubmit({ verification_token: value })
    }
  }

  return (
    user && (
      <Container className={style.container} column justify="center" fitContent>
        <Container
          className={style.formTitle}
          align="center"
          justify="center"
          column
        >
          <Icon
            style={{
              fontSize: isLessThan2xl ? 38 : 40,
              marginBottom: isLessThan2xl ? 28 : 32,
            }}
            as={LockIcon}
          />
          Verificação obrigatória
        </Container>

        <Container justify="center">
          <FormControl isInvalid={fieldsErrors?.pin}>
            <FormLabel
              textAlign="center"
              fontSize={14}
              fontWeight="regular"
              marginBottom={0}
              marginEnd={0}
            >
              Insira o código enviado para o email{' '}
              <Text fontSize={14} color="purple.300" as="span">
                {user.email}
              </Text>
            </FormLabel>

            <Container justify="center" className={style.pin}>
              <Container justify="between" gap={isLessThan2xl ? 8 : 10}>
                <PinInput
                  placeholder=""
                  onChange={handleChange}
                  type="alphanumeric"
                  autoFocus
                  isInvalid={fieldsErrors?.pin}
                  manageFocus
                >
                  <PinInputField
                    minW={{ base: '56px', md: '50px', '2xl': '56px' }}
                    minH={{ base: '56px', md: '50px', '2xl': '56px' }}
                    border="transparent"
                    data-testid="input1"
                  />
                  <PinInputField
                    minW={{ base: '56px', md: '50px', '2xl': '56px' }}
                    minH={{ base: '56px', md: '50px', '2xl': '56px' }}
                    border="transparent"
                    data-testid="input2"
                  />
                  <PinInputField
                    minW={{ base: '56px', md: '50px', '2xl': '56px' }}
                    minH={{ base: '56px', md: '50px', '2xl': '56px' }}
                    border="transparent"
                    data-testid="input3"
                  />
                  <PinInputField
                    minW={{ base: '56px', md: '50px', '2xl': '56px' }}
                    minH={{ base: '56px', md: '50px', '2xl': '56px' }}
                    border="transparent"
                    data-testid="input4"
                  />
                  <PinInputField
                    minW={{ base: '56px', md: '50px', '2xl': '56px' }}
                    minH={{ base: '56px', md: '50px', '2xl': '56px' }}
                    border="transparent"
                    data-testid="input5"
                  />
                  <PinInputField
                    minW={{ base: '56px', md: '50px', '2xl': '56px' }}
                    minH={{ base: '56px', md: '50px', '2xl': '56px' }}
                    border="transparent"
                    onKeyDown={handleKeyEnterDown}
                    data-testid="input6"
                  />
                </PinInput>
                <IconButton
                  isDisabled={!value || value.length !== 6}
                  isLoading={fetching}
                  onClick={handleButtonClick}
                  aria-label="Validar e jogar agora!"
                  style={{ fontSize: '22px' }}
                  minW={{ base: '56px', md: '50px', '2xl': '56px' }}
                  minH={{ base: '56px', md: '50px', '2xl': '56px' }}
                  icon={<ArrowRightIcon color="currentColor" />}
                  data-testid="sendButton"
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

            <FormHelperText
              textAlign="center"
              marginTop="40px"
              color="gray.300"
            >
              Não é seu e-mail?{' '}
              <Link as={RouterLink} to="/alterar-email" variant={'inline'}>
                Clique aqui
              </Link>
              .
            </FormHelperText>
          </FormControl>
        </Container>
      </Container>
    )
  )
}
