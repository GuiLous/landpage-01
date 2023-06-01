import {
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useOutsideClick,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AccountsAPI } from '@api'
import { AccountCard, Container } from '@components'
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

  const handleButtonClickConfirm = (event) => {
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
      <Container className={style.container} gap={12}>
        <InputGroup maxW={424} ref={inputGroupRef} onClick={setEditingTrue}>
          <Input
            ref={inputRef}
            autoFocus
            id="email"
            pl="16px"
            pr="16px"
            fontSize="14px"
            borderRadius="4px"
            minH="42px"
            border={
              formError || !isEmailValid(email) ? '1px solid #F63535' : ''
            }
            variant={isEditing ? '' : 'disabled'}
            disabled={!isEditing}
            value={email}
            onChange={handleChange}
            onKeyDown={handleKeyEnterDown}
            _focus={{
              border:
                formError | !isEmailValid(email)
                  ? '1px solid #F63535'
                  : '1px solid #00E4C9',
              pl: '15px',
            }}
          />

          <InputRightElement
            right={4}
            cursor="pointer"
            onClick={isEditing ? handleButtonClickConfirm : setEditingTrue}
            width="fit-content"
            as="button"
            type="submit"
          >
            <Text
              fontSize={14}
              fontWeight={isEditing ? 'medium' : 'regular'}
              color={isEditing ? 'secondary.400' : 'white'}
            >
              {isEditing ? 'confirmar' : 'editar'}
            </Text>
          </InputRightElement>
        </InputGroup>

        {formError && (
          <Text
            fontSize={12}
            mb="-30px"
            color="danger.400"
            pl="5px"
            fontWeight="medium"
          >
            {formError}
          </Text>
        )}
      </Container>
    </AccountCard>
  )
}
