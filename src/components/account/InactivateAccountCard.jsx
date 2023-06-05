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
    const response = await AccountsAPI.inactivate(token)
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
      description="Ao inativar sua conta suas informações tornam-se privadas e você não será capaz de acessar nossos serviços até que a reative novamente."
    >
      <Container className={style.container}>
        <Button
          id="inactivate"
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
              Atenção! Ao inativar sua conta você pode perder quaisquer
              benefícios adquiridos <br /> e seu perfil não aparecerá nos
              resultados e buscas. Pare reativar a conta, será <br /> necessário
              entrar em contato com suporte pelo e-mail <br />{' '}
              <Text color="secondary.400" as="span">
                suporte@reloadclub.gg
              </Text>
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
