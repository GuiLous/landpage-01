import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useOutsideClick,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AccountsAPI } from '@api'
import {
  AccountCard,
  CheckCircleIcon,
  Container,
  LockIcon,
  WarningCircleIcon,
} from '@components'
import { isEmailValid } from '@components/forms/Validators'
import { StorageService } from '@services'
import { addToast } from '@slices/AppSlice'
import { updateUser } from '@slices/UserSlice'

import style from './ChangeEmailCard.module.css'

export default function ChangeEmailCard() {
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const inputGroupRef = useRef(null)
  const inputRef = useRef(null)

  const [email, setEmail] = useState(user.email)
  const [isEditing, setIsEditing] = useState(false)
  const [fieldsErrors, setFieldsErrors] = useState(null)

  const setEditingTrue = () => {
    email === user.email && setEmail('')
    setIsEditing(true)
  }

  const handleChange = (event) => {
    const value = event.target.value

    if (
      fieldsErrors !== null &&
      fieldsErrors.email &&
      value !== fieldsErrors.email
    ) {
      setFieldsErrors(null)
    }

    setEmail(value)
  }

  const handleClickButtonSave = (event) => {
    event.preventDefault()

    isEmailValid(email) && handleSubmit()
  }

  const handleKeyEnterDown = (event) => {
    if (event.key === 'Enter') {
      isEmailValid(email) && handleSubmit()
    }
  }

  const handleSubmit = async () => {
    const token = StorageService.get('token')

    let response
    response = await AccountsAPI.updateEmail(token, email)

    if (response.fieldsErrors) {
      setFieldsErrors(response.fieldsErrors)
      return
    } else if (response.errorMsg) {
      dispatch(
        addToast({
          content: response.errorMsg,
          variant: 'error',
        })
      )
      return
    }

    dispatch(updateUser(response))

    dispatch(
      addToast({
        title: 'E-mail atualizado com sucesso!',
        variant: 'success',
      })
    )

    setIsEditing(false)
  }

  const handleOutsideClick = () => {
    setIsEditing(false)
    setFieldsErrors(null)

    let isCurrentEmailValid = false

    if (email === '') {
      setEmail(user.email)
      isCurrentEmailValid = isEmailValid(user.email)
    } else {
      isCurrentEmailValid = isEmailValid(email)
    }

    if (!isCurrentEmailValid) {
      setEditingTrue()
      inputRef.current.focus()
    }
  }

  const hasErrors = () => {
    return fieldsErrors?.email || !isEmailValid(email)
  }

  useOutsideClick({
    ref: inputGroupRef,
    handler: handleOutsideClick,
  })

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  return (
    <AccountCard
      title="INFORMAÇÕES PESSOAIS"
      description="Essa informação é particular e não será compartilhada com outras pessoas."
      icon={LockIcon}
    >
      <Container className={style.container} gap={32}>
        <Container column>
          <FormControl>
            <InputGroup maxW={424} ref={inputGroupRef} onClick={setEditingTrue}>
              <Container column>
                <FormLabel
                  htmlFor="email"
                  fontSize={14}
                  color="gray.300"
                  fontWeight="medium"
                >
                  E-mail
                </FormLabel>

                <Container align="center" style={{ position: 'relative' }}>
                  <Input
                    ref={inputRef}
                    id="email"
                    name="email"
                    autoFocus
                    variant="secondary"
                    value={email}
                    _focus={
                      email === user.email || email === ''
                        ? {
                            border: '1px solid',
                            borderColor: 'purple.400',
                          }
                        : {
                            border: '1px solid',
                            borderColor:
                              hasErrors() && email !== ''
                                ? 'red.500'
                                : 'green.400',
                          }
                    }
                    disabled={!isEditing}
                    onChange={handleChange}
                    onKeyDown={handleKeyEnterDown}
                  />
                  <InputRightElement
                    right={4}
                    cursor="pointer"
                    width="fit-content"
                    height="100%"
                    as="button"
                    type="submit"
                  >
                    {user.email === email && !isEditing && (
                      <Text fontSize={14} fontWeight="medium" color="gray.400">
                        EDITAR
                      </Text>
                    )}

                    {user.email !== email &&
                      !isEditing &&
                      (isEmailValid(email) ? (
                        <Icon
                          as={CheckCircleIcon}
                          data-testid="checkCircleIcon1"
                          color="green.400"
                          fontSize={22}
                        />
                      ) : (
                        <Icon
                          as={WarningCircleIcon}
                          data-testid="warningCircleIcon1"
                          color="red.500"
                          fontSize={22}
                        />
                      ))}

                    {isEditing &&
                      (isEmailValid(email) ? (
                        <Icon
                          as={CheckCircleIcon}
                          data-testid="checkCircleIcon2"
                          color="green.400"
                          fontSize={22}
                        />
                      ) : (
                        email !== '' && (
                          <Icon
                            as={WarningCircleIcon}
                            data-testid="warningCircleIcon2"
                            color="red.500"
                            fontSize={22}
                          />
                        )
                      ))}
                  </InputRightElement>
                </Container>
              </Container>
            </InputGroup>
          </FormControl>

          {fieldsErrors?.email && (
            <Text
              fontSize={12}
              color="red.500"
              pl="5px"
              mt="12px"
              fontWeight="medium"
            >
              {fieldsErrors?.email}
            </Text>
          )}
        </Container>

        <Button
          borderRadius="4px"
          fontWeight="semiBold"
          fontSize={14}
          minH="42px"
          h="fit-content"
          isDisabled={hasErrors() || user.email === email}
          onClick={handleClickButtonSave}
          data-testid="saveBtn"
        >
          Salvar
        </Button>
      </Container>
    </AccountCard>
  )
}
