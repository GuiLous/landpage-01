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
import { isEmailValid } from '@components/input/Validators'
import { StorageService } from '@services'
import { addToast } from '@slices/ToastSlice'
import { updateUser } from '@slices/UserSlice'

import style from './ChangeEmailCard.module.css'

export default function ChangeEmailCard() {
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const inputGroupRef = useRef(null)
  const inputRef = useRef(null)

  const [email, setEmail] = useState(user.email)
  const [isEditing, setIsEditing] = useState(false)
  const [formError, setFormError] = useState(null)

  const setEditingTrue = () => {
    setIsEditing(true)
  }

  const handleChange = (event) => {
    setEmail(event.target.value)
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

    if (response.formError) {
      if (response.formError.field === 'email')
        setFormError(response.formError.error)
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
    setFormError(null)
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
      <Container className={style.container} gap={25}>
        <Container column>
          <InputGroup maxW={424} ref={inputGroupRef} onClick={setEditingTrue}>
            <Input
              ref={inputRef}
              autoFocus
              variant="secondary"
              value={email}
              pl={(formError || !isEmailValid(email)) && '15px'}
              border={
                formError || !isEmailValid(email) ? '1px solid #F63535' : ''
              }
              _focus={{
                border:
                  formError || !isEmailValid(email)
                    ? '1px solid #F63535'
                    : '1px solid #6BE400',
                pl: '15px',
              }}
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
                      fill="gray.700"
                      _hover={{ fill: 'white' }}
                      transition="all 0.2s ease"
                    />
                  </Box>
                </Tooltip>
              )}

              {user.email !== email &&
                !isEditing &&
                (isEmailValid(email) ? (
                  <Icon as={CheckCircleIcon} fill="#6BE400" fontSize={22} />
                ) : (
                  <Icon
                    as={WarningCircleIcon}
                    fill="danger.400"
                    fontSize={22}
                  />
                ))}

              {isEditing &&
                (isEmailValid(email) ? (
                  <Icon as={CheckCircleIcon} fill="#6BE400" fontSize={22} />
                ) : (
                  <Icon
                    as={WarningCircleIcon}
                    fill="danger.400"
                    fontSize={22}
                  />
                ))}
            </InputRightElement>
          </InputGroup>

          {formError && (
            <Text
              fontSize={12}
              color="danger.400"
              pl="5px"
              mb="-18px"
              fontWeight="medium"
            >
              {formError}
            </Text>
          )}
        </Container>

        <Button
          borderRadius="4px"
          fontWeight="semiBold"
          fontSize={14}
          minH="34px"
          h="fit-content"
          isDisabled={formError || !isEmailValid(email) || user.email === email}
          onClick={handleClickButtonSave}
        >
          Salvar Alterações
        </Button>
      </Container>
    </AccountCard>
  )
}
