import { Button, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { AccountsAPI } from '@api'
import { AccountCard, BlockIcon, Container, Modal } from '@components'
import { StorageService } from '@services'
import { addToast } from '@slices/AppSlice'
import { updateUser } from '@slices/UserSlice'

import style from './InactivateAccountCard.module.css'

export default function InactivateAccountCard() {
  const dispatch = useDispatch()

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [fetching, setFetching] = useState(false)

  const handleAccountInactivation = async () => {
    if (fetching) return

    setFetching(true)
    const token = StorageService.get('token')
    const response = await AccountsAPI.inactivate(token)
    setFetching(false)

    if (response.errorMsg) {
      dispatch(
        addToast({
          content: response.errorMsg,
          variant: 'error',
        })
      )
      return
    }

    dispatch(updateUser(null))
    StorageService.remove('token')
  }

  const handleClose = () => {
    setIsOpenModal(false)
  }

  return (
    <AccountCard
      title="INATIVAR CONTA"
      description="Ao inativar sua conta suas informações tornam-se privadas e você não será capaz de acessar nossos serviços até que a reative novamente."
      icon={BlockIcon}
    >
      <Container className={style.container}>
        <Button
          id="inactivate"
          textTransform="uppercase"
          fontWeight="semibold"
          fontSize={14}
          borderRadius="4px"
          minHeight="38px"
          height="38px"
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
          maxWidthModal="784px"
        >
          <Container justify="center" align="center" column gap={40}>
            <Text color="white" fontSize={16} textAlign="center" maxW="624px">
              Atenção! Ao inativar sua conta você pode perder quaisquer
              benefícios adquiridos e seu perfil não aparecerá nos resultados e
              buscas. Pare reativar a conta, será necessário entrar em contato
              com suporte pelo e-mail <br />{' '}
              <Text color="cyan.400" as="span">
                suporte@reloadclub.gg
              </Text>
            </Text>

            <Button
              textTransform="uppercase"
              fontWeight="semibold"
              fontSize={14}
              borderRadius="4px"
              minHeight="38px"
              height="38px"
              loadingText="Inativando..."
              isLoading={fetching}
              onClick={handleAccountInactivation}
              data-testid="inactiveBtn"
            >
              Prosseguir com a inativação
            </Button>
          </Container>
        </Modal>
      )}
    </AccountCard>
  )
}
