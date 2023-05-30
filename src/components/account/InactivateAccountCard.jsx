import { Button, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AccountCard, Container, ModalConfirmation } from '@components'

import style from './InactivateAccountCard.module.css'

export default function InactivateAccountCard() {
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const [isOpenModal, setIsOpenModal] = useState(false)

  // const handleSubmit = async () => {
  //   const token = StorageService.get('token')

  //   let response
  //   response = await AccountsAPI.update(token, email)

  //   if (response.errorMsg) {
  //     if (response.field) setFormError(response)
  //     return
  //   }

  //   setEmail(response.email)

  //   dispatch(updateUser(response))
  //   dispatch(
  //     addToast({
  //       title: 'E-mail atualizado com sucesso!',
  //       variant: 'success',
  //     })
  //   )

  //   setIsEditing(false)
  // }

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
        <ModalConfirmation
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
            >
              Prosseguir com a inativação
            </Button>
          </Container>
        </ModalConfirmation>
      )}
    </AccountCard>
  )
}
