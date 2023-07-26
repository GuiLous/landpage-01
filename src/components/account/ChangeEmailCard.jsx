import {
  Box,
  Button,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Tooltip,
  useOutsideClick,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AccountsAPI } from '@api'
import {
  AccountCard,
  CheckCircleIcon,
  Container,
  PencilIcon,
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
      setEditingTrue(true)
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
      title="ALTERAR E-MAIL"
      description="Essa informação é particular e não será compartilhada com outras pessoas."
    >
      <Container className={style.container} gap={24}>
        <Container column>
          <InputGroup maxW={424} ref={inputGroupRef} onClick={setEditingTrue}>
            <Input
              ref={inputRef}
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
                        hasErrors() && email !== '' ? 'red.500' : 'green.400',
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
                <Tooltip
                  label="Editar e-mail"
                  aria-label="edit icon"
                  placement="right-start"
                >
                  <Box display="flex">
                    <Icon
                      as={PencilIcon}
                      fill="gray.300"
                      _hover={{ fill: 'white' }}
                      transition="all 0.2s ease"
                    />
                  </Box>
                </Tooltip>
              )}

              {user.email !== email &&
                !isEditing &&
                (isEmailValid(email) ? (
                  <Icon as={CheckCircleIcon} color="green.400" fontSize={22} />
                ) : (
                  <Icon as={WarningCircleIcon} color="red.500" fontSize={22} />
                ))}

              {isEditing &&
                (isEmailValid(email) ? (
                  <Icon as={CheckCircleIcon} color="green.400" fontSize={22} />
                ) : (
                  email !== '' && (
                    <Icon
                      as={WarningCircleIcon}
                      color="red.500"
                      fontSize={22}
                    />
                  )
                ))}
            </InputRightElement>
          </InputGroup>

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
          minH="34px"
          h="fit-content"
          isDisabled={
            fieldsErrors?.email || !isEmailValid(email) || user.email === email
          }
          onClick={handleClickButtonSave}
        >
          Salvar Alterações
        </Button>
      </Container>
    </AccountCard>
  )
}
