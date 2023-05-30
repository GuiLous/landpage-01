import { Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
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

  const inputRef = useRef(null)

  const [email, setEmail] = useState(user.email)
  const [isEditEnabled, setIsEditEnabled] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [formError, setFormError] = useState()

  const toggleInput = () => {
    setIsEditEnabled(true)
  }

  const handleChange = (event) => {
    setEmail(event.target.value)
  }

  const handleButtonClick = (event) => {
    event.preventDefault()

    isEmailValid(email) && handleSubmit()
  }

  const handleKeyEnterDown = (event) => {
    if (event.key === 'Enter') {
      isEmailValid(email) && handleSubmit()
    }
  }

  const handleSubmit = async () => {
    setFetching(true)

    const token = StorageService.get('token')

    let response
    response = await AccountsAPI.update(token, email)

    if (response.errorMsg) {
      setFetching(false)
      if (response.field) setFormError(response)
      return
    }

    setEmail(response.email)
    setFetching(false)

    dispatch(updateUser(response))
    dispatch(
      addToast({
        title: 'E-mail atualizado!',
        variant: 'success',
      })
    )

    setIsEditEnabled(false)
  }

  useEffect(() => {
    if (isEditEnabled && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditEnabled])

  return (
    <AccountCard
      title="ALTERAR E-MAIL"
      description="Essa informação é particular e não será compartilhada com outras pessoas."
    >
      <Container className={style.container} gap={12}>
        <InputGroup maxW={424}>
          <Input
            ref={inputRef}
            autoFocus
            pl="16px"
            pr="16px"
            fontSize="14px"
            variant={isEditEnabled ? '' : 'disabled'}
            disabled={!isEditEnabled || fetching}
            value={email}
            _focus={{
              border: formError ? '2px solid #F63535' : '2px solid #00E4C9',
              pl: '14px',
            }}
            onChange={handleChange}
            onKeyDown={handleKeyEnterDown}
          />

          <InputRightElement
            right={4}
            cursor="pointer"
            onClick={isEditEnabled ? handleButtonClick : toggleInput}
            width="fit-content"
            as="button"
            type="submit"
          >
            <Text
              fontSize={14}
              fontWeight={isEditEnabled ? 'medium' : 'regular'}
              color={isEditEnabled ? 'secondary.400' : 'white'}
            >
              {isEditEnabled ? 'confirmar' : 'editar'}
            </Text>
          </InputRightElement>
        </InputGroup>

        {formError && (
          <Text fontSize={12} color="danger.400" pl="5px" fontWeight="medium">
            {formError.errorMsg}
          </Text>
        )}

        {!user.account.is_verified && !formError && (
          <Text fontSize={12} color="danger.400" pl="5px" fontWeight="medium">
            X email não verificado.
          </Text>
        )}
      </Container>
    </AccountCard>
  )
}
