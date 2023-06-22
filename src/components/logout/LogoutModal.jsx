import { Button, Text } from '@chakra-ui/react'
import { StorageService } from '@services'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { AccountsAPI } from '@api'
import { Container, Modal } from '@components'
import { addToast } from '@slices/AppSlice'

export default function LogoutModal({ isOpen, setIsOpen }) {
  const dispatch = useDispatch()

  const [isFetching, setIsFetching] = useState(false)

  const handleCloseModalSupport = () => {
    setIsOpen(false)
  }

  const handleLogout = async () => {
    setIsFetching(true)
    const token = StorageService.get('token')
    const response = await AccountsAPI.logout(token)

    if (response.errorMsg) {
      dispatch(
        addToast({
          content: response.errorMsg,
          variant: 'error',
        })
      )
      setIsFetching(false)
      return
    }

    StorageService.remove('token')
    window.location.href = '/'
  }

  return (
    <Modal
      isOpen={isOpen}
      title="ESTÁ INDO EMBORA?"
      onClose={handleCloseModalSupport}
      headerMarginBottom={40}
    >
      <Container justify="center" align="center" column gap={40}>
        <Text color="white" fontSize={14} textAlign="center" maxW="326px">
          Você está prestes a fazer logout da sua conta. Tem certeza de que
          deseja sair?
        </Text>

        <Container fitContent align="center" justify="center" gap={14}>
          <Button
            variant="neutral"
            w="102px"
            isDisabled={isFetching}
            onClick={handleCloseModalSupport}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            w="102px"
            isLoading={isFetching}
            onClick={handleLogout}
          >
            Sair
          </Button>
        </Container>
      </Container>
    </Modal>
  )
}
