import { Button, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { AccountsAPI } from '@api'
import { AccountCard, Container, Modal } from '@components'
import { StorageService } from '@services'
import { addToast } from '@slices/ToastSlice'
import { updateUser } from '@slices/UserSlice'

import style from './DeleteAccountCard.module.css'

export default function DeleteAccountCard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [fetching, setFetching] = useState(false)

  const handleDeleteAccount = async () => {
    if (fetching) return

    setFetching(true)
    const token = StorageService.get('token')
    const response = await AccountsAPI.delete(token)
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
      title="EXCLUIR CONTA"
      description="Exclua permanentemente a sua conta. Você perderá todo histórico de partidas e o seu elo atual."
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
          Prosseguir com a exclusão
        </Button>
      </Container>

      {isOpenModal && (
        <Modal isOpen={isOpenModal} title="EXCLUIR CONTA" onClose={handleClose}>
          <Container justify="center" align="center" column gap={40}>
            <Text color="gray.700" fontSize={14} textAlign="center">
              Aviso! Se continuar, os detalhes da sua conta e perfil serão
              excluídos em{' '}
              <Text lineHeight={1} color="secondary.400" as="span">
                outubro 21,
                <br /> 2023
              </Text>
              . Você não ficará visível no Reload Club no período de agora até
              essa data. Se <br /> mudar de ideia, poderá entrar novamente antes
              da data da exclusão permanente e <br /> escolher a opção para
              manter a conta.
            </Text>

            <Button
              textTransform="uppercase"
              fontWeight="semibold"
              fontSize={14}
              borderRadius="4px"
              minHeight="37px"
              loadingText="Excluindo..."
              isLoading={fetching}
              onClick={handleDeleteAccount}
            >
              Prosseguir com a exclusão
            </Button>
          </Container>
        </Modal>
      )}
    </AccountCard>
  )
}
