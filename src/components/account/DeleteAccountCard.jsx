import { Button, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { AccountsAPI } from '@api'
import { AccountCard, Container, Modal } from '@components'
import { StorageService } from '@services'
import { addToast } from '@slices/AppSlice'
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
      description="Exclua permanentemente a sua conta. Essa ação é permanente e não pode ser desfeita."
    >
      <Container className={style.container}>
        <Button
          id="delete"
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
        <Modal
          isOpen={isOpenModal}
          title="EXCLUIR CONTA"
          onClose={handleClose}
          size="3xl"
        >
          <Container
            justify="center"
            align="center"
            column
            gap={40}
            style={{ padding: '0 80px' }}
          >
            <Text color="gray.700" fontSize={14} textAlign="center">
              Atenção! Ao confirmar, você perderá todo histórico de partidas,
              nível, itens adquiridos na loja ou por outros meios. A exclusão
              apaga permanentemente todas as informações associadas à sua conta.
              Caso queira utilizar nossos serviços novamente, terá que fazer um
              novo cadastro para criar uma nova conta. Deseja mesmo prosseguir?
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
