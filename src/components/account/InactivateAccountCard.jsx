import { Button, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { AccountsAPI } from '@api'
import { AccountCard, Container, Modal } from '@components'
import { StorageService } from '@services'
import { addToast } from '@slices/ToastSlice'
import { updateUser } from '@slices/UserSlice'

import style from './InactivateAccountCard.module.css'

export default function InactivateAccountCard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [fetching, setFetching] = useState(false)

  const handleAccountInactivation = async () => {
    if (fetching) return

    setFetching(true)
    const token = StorageService.get('token')
    const response = await AccountsAPI.updateIsActive(token, false)
    setFetching(false)

    if (response.formError) {
      dispatch(
        addToast({
          title: 'Algo saiu errado...',
          content: response.formError.error,
          variant: 'error',
        })
      )
      return
    }

    dispatch(updateUser(null))
    StorageService.remove('token')
    navigate('/')
  }

  const handleClose = () => {
    setIsOpenModal(false)
  }

  return (
    <AccountCard
      title="INATIVAR CONTA"
      description="Desative temporariamente a sua conta. Você não perderá nenhuma de suas informações."
    >
      <Container className={style.container}>
        <Button
          textTransform="uppercase"
          fontWeight="semibold"
          fontSize={14}
          borderRadius="4px"
          minHeight="37px"
          onClick={() => setIsOpenModal(true)}
        >
          Prosseguir com a inativação
        </Button>
      </Container>

      {isOpenModal && (
        <Modal
          isOpen={isOpenModal}
          title="INATIVAR CONTA"
          onClose={handleClose}
        >
          <Container justify="center" align="center" column gap={40}>
            <Text color="gray.700" fontSize={14} textAlign="center">
              Aviso! Depois que sua conta for suspensa, você terá que aguardar
              30 dias para <br />
              reativá-la novamente ou entrar em contato com o suporte para
              revogá-la.
            </Text>

            <Button
              textTransform="uppercase"
              fontWeight="semibold"
              fontSize={14}
              borderRadius="4px"
              minHeight="37px"
              loadingText="Inativando..."
              isLoading={fetching}
              onClick={handleAccountInactivation}
            >
              Prosseguir com a inativação
            </Button>
          </Container>
        </Modal>
      )}
    </AccountCard>
  )
}
